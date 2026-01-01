import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import SeatLayout from '../pages/SeatLayout';
import Favourite from '../pages/Favourite';
import MyBookings from '../pages/MyBookings';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import MovieDetails from '../pages/MovieDetails';  
import MainLayout from '../pages/MainLayout';
const AppRoutes = () => {
  return (
    <>
    <Routes>
      <Route element={<MainLayout />} >
      <Route path="/" element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/movie/:id/:date" element={<SeatLayout />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      </Route>
      <Route path="/favorite" element={<Favourite />} />
    </Routes>
    </>
  );
};

export default AppRoutes;