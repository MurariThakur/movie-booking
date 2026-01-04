import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import BlurCircle from "./BlurCircle";
import ReactPlayer from "react-player";
import { PlayCircleIcon } from "lucide-react";
const TrailerSection = () => {
  const [trailer, setTrailer] = useState(dummyTrailers[0]);
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] max-auto">
        Trailers
      </p>

      <div className=" md:w-full  aspect-video md:h-[540px] rounded-xl overflow-hidden">
        <ReactPlayer
          url={trailer.videoUrl}
          controls
          width="100%"
          height="100%"
        />
      </div>

      <div className="mt-8 max-w-3xl mx-auto w-full overflow-hidden">
        <div className="flex gap-4 overflow-x-auto pb-3">
          {dummyTrailers.map((item) => (
            <div
              key={item.image}
              onClick={() => setTrailer(item)}
              className="
          relative cursor-pointer
          min-w-[160px] sm:min-w-[180px] md:min-w-0
          h-28 sm:h-36 md:h-40
          transition duration-300 hover:-translate-y-1
        "
            >
              <img
                src={item.image}
                alt="Thumbnail"
                className="w-full h-full object-cover rounded-lg brightness-75"
              />

              <PlayCircleIcon
                strokeWidth={1.6}
                className="absolute inset-0 m-auto w-6 h-6 sm:w-8 sm:h-8 text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrailerSection;
