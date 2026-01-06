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
import AdminLayout from "../pages/admin/Layout";
import AddShows from "../pages/admin/AddShow";
import ListBookings from "../pages/admin/ListBookings";
import ListShows from "../pages/admin/ListShow";
import Dashboard from "../pages/admin/Dashboard";
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
        <Route path="/admin/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
          <Route path="list-shows" element={<ListShows />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
