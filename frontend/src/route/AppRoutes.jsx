import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import { useAppContext } from "../../context/AppContext";
import ProtectedRoute from "../components/ProtectedRoute";

/* ---------- Lazy Imports ---------- */

// Main pages
const Home = lazy(() => import("../pages/Home"));
const Movies = lazy(() => import("../pages/Movies"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));
const SeatLayout = lazy(() => import("../pages/SeatLayout"));
const Favourite = lazy(() => import("../pages/Favourite"));
const MyBookings = lazy(() => import("../pages/MyBookings"));
const NotFound = lazy(() => import("../pages/NotFound"));
const MainLayout = lazy(() => import("../pages/MainLayout"));

// Admin pages
const AdminLayout = lazy(() => import("../pages/admin/Layout"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const AddShows = lazy(() => import("../pages/admin/AddShow"));
const ListBookings = lazy(() => import("../pages/admin/ListBookings"));
const ListShows = lazy(() => import("../pages/admin/ListShow"));

const AppRoutes = () => {
  const { user } = useAppContext();

  return (
    <Routes>
      {/* ---------- USER ROUTES ---------- */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:id" element={<MovieDetails />} />
        <Route path="movies/:id/:date" element={<SeatLayout />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="favorite" element={<Favourite />} />
      </Route>

      {/* ---------- ADMIN ROUTES ---------- */}
      <Route
        path="/admin"
        element={
          user ? (
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          ) : (
            <div className="min-h-screen flex justify-center items-center">
              <SignIn fallbackRedirectUrl="/admin" />
            </div>
          )
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add-shows" element={<AddShows />} />
        <Route path="list-bookings" element={<ListBookings />} />
        <Route path="list-shows" element={<ListShows />} />
      </Route>

      {/* ---------- 404 ---------- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
