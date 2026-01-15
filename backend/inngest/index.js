import { Inngest } from "inngest";
import user from "../models/user.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import sendEmail from "../config/nodeMailer.js";
import { clerkClient } from "@clerk/express";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-booking" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: first_name + " " + last_name,
      email: email_addresses[0].email_address,
      image: image_url,
    };
    await user.create(userData);
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "Delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await user.findByIdAndDelete(id);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: first_name + " " + last_name,
      email: email_addresses[0].email_address,
      image: image_url,
    };
    await user.findByIdAndUpdate(id, userData);
  }
);

const releaseSeatsAndDeleteBooking = inngest.createFunction(
  { id: "release-seats-and-delete-booking" },
  { event: "app/checkpayment" },
  async ({ event, step }) => {
    const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);
    await step.sleepUntil("wait-for-10-min", tenMinutesLater);

    await step.run("check-payment-status", async () => {
      const bookingId = event.data.bookingId;
      const booking = await Booking.findById(bookingId);

      if (!booking.isPaid) {
        const show = await Show.findById(booking.show);
        booking.bookedSeats.forEach((seat) => {
          delete show.occupiedSeats[seat];
        });
        show.markModified("occupiedSeats");
        await show.save();
        await Booking.findByIdAndDelete(booking._id);
      }
    });
  }
);

const sendBookingConfirmationEmail = inngest.createFunction(
  { id: "send-booking-confirmation-email" },
  { event: "app/show.booked" },
  async ({ event, step }) => {
    const { bookingId } = event.data;
    const booking = await Booking.findById(bookingId)
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "Movie",
        },
      });

    // Fetch user details from Clerk
    const clerkUser = await clerkClient.users.getUser(booking.user);
    const userName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User';
    const userEmail = clerkUser.emailAddresses[0]?.emailAddress;

    if (!userEmail) {
      console.error('No email found for user:', booking.user);
      return;
    }

    await sendEmail(
      userEmail,
      `🎬 Booking Confirmed: ${booking.show.movie.title}`,
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎬 Booking Confirmed!</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-top: 0;">Hi ${userName},</h2>
          <p style="color: #666; line-height: 1.6;">Thank you for your payment! Your booking for <strong style="color: #667eea;">${booking.show.movie.title}</strong> has been confirmed.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📋 Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>🎥 Movie:</strong></td>
                <td style="padding: 10px 0; color: #333;">${booking.show.movie.title}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>📅 Date:</strong></td>
                <td style="padding: 10px 0; color: #333;">${new Date(booking.show.showDateTime).toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" })}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>🕐 Time:</strong></td>
                <td style="padding: 10px 0; color: #333;">${new Date(booking.show.showDateTime).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;"><strong>💺 Seats:</strong></td>
                <td style="padding: 10px 0; color: #333;">${booking.bookedSeats.join(", ")}</td>
              </tr>
              <tr style="border-top: 2px solid #ddd;">
                <td style="padding: 15px 0 0 0; color: #666;"><strong>💰 Total Amount:</strong></td>
                <td style="padding: 15px 0 0 0; color: #667eea; font-size: 20px; font-weight: bold;">₹${booking.amount}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-top: 20px;">Please arrive 15 minutes before the show time. Enjoy your movie! 🍿</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 14px;">
            <p style="margin: 5px 0;">Best regards,</p>
            <p style="margin: 5px 0; font-weight: bold; color: #667eea;">Movie Booking Team</p>
          </div>
        </div>
      </div>
      `
    );
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  releaseSeatsAndDeleteBooking,
  sendBookingConfirmationEmail,
];
