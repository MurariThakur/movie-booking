import express from "expresss";
import { protectAdmin } from "../middleware/auth";
import { isAdmin, getDashboardData ,getAllShows,getAllBookings} from "../controllers/AdminController";

const adminRouter = express.Router();

adminRouter.get('/is-admin',protectAdmin,isAdmin);
adminRouter.get('/dashboard',protectAdmin,getDashboardData);
adminRouter.get('/all-shows',protectAdmin,getAllShows);
adminRouter.get('/all-bookings',protectAdmin,getAllBookings);

export default adminRouter;