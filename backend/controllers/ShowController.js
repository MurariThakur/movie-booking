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

    let movie = await Movie.findById(movieId);
    if (!movie) {
      const [movieDetailsResonse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }),
      ]);

      const movieDetailsData = movieDetailsResonse.data;
      const movieCreditData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieDetailsData.id,
        title: movieDetailsData.title,
        overview: movieDetailsData.overview,
        poster_path: movieDetailsData.poster_path,
        backdrop_path: movieDetailsData.backdrop_path,
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

    const showToCreate = [];
    showInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showToCreate.push({
          movie: movieId,
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
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const uniqueMovies = new Map();

    shows.forEach((show) => {
      uniqueMovies.set(show.movie._id.toString(), show.movie);
    });

    res.json({
      success: true,
      shows: Array.from(uniqueMovies.values()),
    });
  } catch (error) {
    console.error(error);
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

export { getNowPlayingMovies, addShow, getShows, getShow };
