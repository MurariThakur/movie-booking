import { memo } from 'react';
import Navbar from './components/Navbar';
import { Route, Router, Routes } from 'react-router-dom';
import SeatLayout from './pages/SeatLayout';
import Favourite from './pages/Favourite';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';  

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/movie/:id/:date" element={<SeatLayout />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/favorite" element={<Favourite />} />
    </Routes>
    </>
  );
};

export default App;