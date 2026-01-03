import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 mt-40 md:px-16 lg:px-36 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
        <div className="md:max-w-96">
          <img alt="" class="h-11" src={assets.logo} />
          <p className="mt-6 text-sm">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <img
              src={assets.googlePlay}
              alt="google play"
              className="h-9 w-auto "
            />
            <img
              src={assets.appStore}
              alt="app store"
              className="h-9 w-auto "
            />
          </div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Quick Links</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
              <li>
                <a onClick={(e) => e.preventDefault()}>Contact us</a>
              </li>
              <li>
                <Link to="">Privacy policy</Link>
              </li>
              <li>
                <a
                  href="https://github.com/MurariThakur/movie-booking"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github Repo Link
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+91 8013360851</p>
              <p>murarithakur32@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} ©{" "}
        <a
          href="https://github.com/MurariThakur/movie-booking"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Murari
        </a>
        . All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
