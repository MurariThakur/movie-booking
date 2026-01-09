import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );

    const movies = data.results;
    res.json({ success: true, movies: movies });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error.message });
  }
};

const addShow = async (req, res) => {
  try {
    const { movieId, showPrice, showInput } = req.body;

    // Extract movie ID from the movie object
    const movieIdValue = typeof movieId === 'object' ? movieId.id : movieId;
    
    let movie = await Movie.findById(movieIdValue);
    if (!movie) {
      // If movieId is the full movie object, use it to create the movie
      if (typeof movieId === 'object' && movieId.id) {
        const movieDetails = {
          _id: movieId.id.toString(),
          title: movieId.title,
          overview: movieId.overview,
          poster_path: movieId.poster_path,
          backdrop_path: movieId.backdrop_path,
          genres: movieId.genre_ids || [],
          casts: [],
          release_date: movieId.release_date,
          original_language: movieId.original_language,
          tagline: movieId.tagline || "",
          vote_average: movieId.vote_average,
          vote_count: movieId.vote_count,
          runtime: movieId.runtime || 0,
        };
        movie = await Movie.create(movieDetails);
      } else {
        // Fallback: fetch from TMDB API if only ID is provided
        const [movieDetailsResonse, movieCreditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieIdValue}`, {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${movieIdValue}/credits`, {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
          }),
        ]);

        const movieDetailsData = movieDetailsResonse.data;
        const movieCreditData = movieCreditsResponse.data;

        const movieDetails = {
          _id: movieDetailsData.id.toString(),
          title: movieDetailsData.title,
          overview: movieDetailsData.overview,
          poster_path: movieDetailsData.poster_path,
          backdrop_path: movieDetailsData.backdrop_path,
          genres: movieDetailsData.genres || [],
          casts: movieCreditData.cast,
          release_date: movieDetailsData.release_date,
          original_language: movieDetailsData.original_language,
          tagline: movieDetailsData.tagline || "",
          vote_average: movieDetailsData.vote_average,
          vote_count: movieDetailsData.vote_count,
          runtime: movieDetailsData.runtime,
        };
        movie = await Movie.create(movieDetails);
      }
    }

    const showToCreate = [];
    showInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showToCreate.push({
          movie: movieIdValue.toString(),
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showToCreate.length > 0) {
      await Show.insertMany(showToCreate);
    }
    res.json({ success: true, message: "Shows added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error.message });
  }
};

const getShows = async (req, res) => {
  try {
    const shows = await Show.find({})
      .populate("movie")
      .sort({ showDateTime: -1 });

    const uniqueMovies = new Map();

    shows.forEach((show) => {
      if (show.movie && !uniqueMovies.has(show.movie._id.toString())) {
        uniqueMovies.set(show.movie._id.toString(), show.movie);
      }
    });

    res.json({
      success: true,
      shows: Array.from(uniqueMovies.values()),
    });
  } catch (error) {
    console.error("Error in getShows:", error);
    res.json({ success: false, error: error.message });
  }
};

const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({})
      .populate("movie")
      .sort({ showDateTime: -1 });

    res.json({
      success: true,
      shows: shows,
    });
  } catch (error) {
    console.error("Error in getAllShows:", error);
    res.json({ success: false, error: error.message });
  }
};

const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, error: "Movie not found" });
    }
    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });
    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });

    res.json({ success: true, movie: movie, dateTime: dateTime });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
};

export { getNowPlayingMovies, addShow, getShows, getShow, getAllShows };