import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-booking" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { handler: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_adresses, image_url } =
      event.data.user;
    const userData = {
      _id: id,
      name: first_name + "" + last_name,
      email: email_adresses[0].email_address,
      image: image_url,
    };
    await user.create(userData);
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "Delete-user-from-clerk" },
  { handler: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await user.findByIdAndDelete(id);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { handler: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_adresses, image_url } =
      event.data.user;
    const userData = {
      _id: id,
      name: first_name + "" + last_name,
      email: email_adresses[0].email_address,
      image: image_url,
    };
    await user.findByIdAndUpdate(id, userData);
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
