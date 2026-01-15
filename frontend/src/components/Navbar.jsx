import React, { use } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, SearchIcon, TicketIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const {favoritesMovies} = useAppContext();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="fixed flex top-0 left-0 z-50 w-full items-center justify-between px-6 py-5 md:px-16 lg:px-16">
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="logo" className="w-36 h-auto" />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
          isMenuOpen ? "max-md:w-full" : "max-md:w-0"
        } `}
      >
        <XIcon
          className=" md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Link
          onClick={() => {
            scrollTo(0, 0), setIsMenuOpen(false);
          }}
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0), setIsMenuOpen(false);
          }}
          to="/movies"
        >
          Movies
        </Link>

        {favoritesMovies &&  favoritesMovies.length > 0 && <Link
          onClick={() => {
            scrollTo(0, 0), setIsMenuOpen(false);
          }}
          to="/favorite"
        >
          Favorites
        </Link>}
      </div>
      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />

        {!user ? (
          <button
            onClick={openSignIn}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Booking"
                labelIcon={<TicketIcon width={15} />}
                onClick={() => navigate("/my-bookings")}
              ></UserButton.Action>
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>
      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
    </div>
  );
};

export default Navbar;
