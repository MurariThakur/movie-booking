import express from "express";
import { getNowPlayingMovies , addShow , getShows, getShow, getAllShows} from "../controllers/ShowController.js";
import { protectAdmin } from "../middleware/auth.js";

const showRouter = express.Router();

showRouter.get("/now-playing", getNowPlayingMovies);
showRouter.post('/add', addShow);
showRouter.get('/all', getShows);
showRouter.get('/list', getAllShows);
showRouter.get('/all/:movieId', getShow);

export default showRouter;