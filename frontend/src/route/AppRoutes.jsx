import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import SeatLayout from "../pages/SeatLayout";
import Favourite from "../pages/Favourite";
import MyBookings from "../pages/MyBookings";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import MainLayout from "../pages/MainLayout";
import NotFound from "../pages/NotFound";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/movies/:id/:date" element={<SeatLayout />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/favorite" element={<Favourite />} />
         
        </Route>
         <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
