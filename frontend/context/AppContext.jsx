import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [shows, setShows] = useState([]);
  const [favoritesMovies, setFavoritesMovies] = useState([]);

  const { user } = useUser();

  const { getToken } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 ADMIN CHECK
  const fetchIsAdmin = async () => {
    try {
      const token = await getToken({ template: "integration" });
      if (!token) {
        setIsAdmin(false);
        return;
      }

      const { data } = await axios.get("/api/admin/is-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsAdmin(data.isAdmin);
    } catch (error) {
      console.error(error);
      setIsAdmin(false);
    }
  };

  // 🎬 SHOWS
  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.error || "Failed to fetch shows");
      }
    } catch (error) {
      toast.error("Failed to fetch shows");
    }
  };

  // ❤️ FAVORITES
  const fetchFavoriteMovies = async () => {
    try {
      const token = await getToken({ template: "integration" });
      if (!token) return;

      const { data } = await axios.get("/api/user/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setFavoritesMovies(data.favorites);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        isAdmin,
        shows,
        favoritesMovies,
        fetchFavoriteMovies,
        fetchIsAdmin,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
