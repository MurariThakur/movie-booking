import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "./MovieCard";

const FeatureSection = () => {
  const navigate = useNavigate();
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p className="text-lg font-medium text-gray-300">Now Showing</p>
        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer z-9999"
        >
          View All
          <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition" />
        </button>
      </div>
      <div className="flex flex-wrap max-sm:justify-center gap-8 mt-8">
        {dummyShowsData.slice(0, 8).map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
      <div className="flex justify-center mt-20">
        <button onClick={()=>navigate('/movies')} className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer">Explore Movies</button>
      </div>
    </div>
  );
};

export default FeatureSection;
