import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import iosTimeFormat from "../libs/iosTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const topRows = ["A", "B"];

  const seatBlocks = [
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
  ];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [show, setShow] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const showData = dummyShowsData.find((s) => s._id === id);
    if (showData) {
      setShow({
        movie: showData,
        dateTime: dummyDateTimeData,
      });
    }
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select a time slot");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can only select 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, start, end) => (
    <div className="flex gap-2">
      {Array.from({ length: end - start + 1 }).map((_, i) => {
        const seatNo = start + i;
        const seatId = `${row}${seatNo}`;

        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 md:h-7 md:w-7 flex items-center justify-center rounded border border-primary/60 transition
              ${
                selectedSeats.includes(seatId)
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  if (!show) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-16 lg:px-40 py-24">
      {/* Available Timings */}
      <div className="w-full md:w-60 bg-primary/10 border border-primary/20 rounded-lg py-6 md:py-10 h-max md:sticky md:top-24">
        <p className="text-lg font-semibold px-6">Available Timings</p>

        <div className="mt-4 space-y-1">
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 py-2 px-6 w-max rounded-r-md cursor-pointer transition
                ${
                  selectedTime?.time === item.time
                    ? "bg-primary text-white"
                    : "hover:bg-primary/20"
                }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{iosTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="relative flex-1 flex flex-col items-center mt-14 md:mt-0">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

        <h1 className="text-2xl font-semibold mb-4">Select Your Seats</h1>

        <img
          src={assets.screenImage}
          alt="screen"
          className="w-full max-w-xs mx-auto"
        />

        <p className="text-gray-400 text-sm mb-25">SCREEN SIDE</p>

        {/* HORIZONTAL SCROLL AREA */}
        <div className="w-full overflow-x-auto overflow-y-hidden">
          <div className="min-w-[720px] mx-auto text-xs text-gray-300">
            {/* A & B */}
            <div className="flex flex-col gap-3 mb-6">
              {topRows.map((row) => (
                <div key={row} className="flex justify-center">
                  {renderSeats(row, 1, 9)}
                </div>
              ))}
            </div>

            {/* C onwards */}
            {seatBlocks.map((block, index) => (
              <div key={index} className="flex flex-col gap-4 mb-10">
                {block.map((row) => (
                  <div key={row} className="flex gap-8 justify-center">
                    {renderSeats(row, 1, 9)}
                    {renderSeats(row, 10, 18)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => navigate("/my-bookings")}
          className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95"
        >
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
