# 🎬 Movie Booking System

A full-stack movie booking application that allows users to browse movies, book tickets, and manage bookings with an admin panel for theater management.

## ✨ Features

### 🎭 User Features
- **Browse Movies**: View now-playing movies with detailed information
- **Book Tickets**: Select seats and book movie tickets
- **User Authentication**: Secure login/signup with Clerk
- **Favorites**: Add movies to favorites list
- **Booking History**: View past and current bookings
- **Email Notifications**: Receive booking confirmation emails

### 👨‍💼 Admin Features
- **Dashboard**: View booking statistics and revenue
- **Movie Management**: Add new shows and manage movie listings
- **Booking Management**: View all bookings and user details
- **Show Management**: Create and manage movie showtimes

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Authentication & Services
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Inngest](https://img.shields.io/badge/Inngest-000000?style=for-the-badge&logo=inngest&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-0F9DCE?style=for-the-badge&logo=nodemailer&logoColor=white)

### External APIs
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Clerk account
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movie-booking.git
   cd movie-booking
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLERK_SECRET_KEY=your_clerk_secret_key
   TMDB_API_KEY=your_tmdb_api_key
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   SENDER_EMAIL=your_sender_email
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

   Create `.env` file:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_CURRENCY="$"
   VITE_BASE_URL=http://localhost:3000
   VITE_MOVIE_BASE_URL=https://image.tmdb.org/t/p/original
   ```

4. **Run the Application**
   
   Start Backend:
   ```bash
   cd backend
   npm run server
   ```

   Start Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

## 🏗️ Project Structure

```
movie-booking/
├── backend/
│   ├── config/          # Database and email configuration
│   ├── controllers/     # API controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   └── inngest/         # Background jobs
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   └── assets/      # Static assets
│   └── public/          # Public assets
└── README.md
```

## 🔧 API Endpoints

### User Routes
- `GET /api/user/booking` - Get user bookings
- `POST /api/user/update-favorite` - Update favorites
- `GET /api/user/favorites` - Get user favorites

### Show Routes
- `GET /api/show/now-playing` - Get now playing movies
- `POST /api/show/add` - Add new show (Admin)
- `GET /api/show/all` - Get all shows
- `GET /api/show/all/:movieId` - Get specific movie shows

### Booking Routes
- `POST /api/booking/create` - Create booking
- `GET /api/booking/seats/:showId` - Get occupied seats

### Admin Routes
- `GET /api/admin/is-admin` - Check admin status
- `GET /api/admin/dashboard-data` - Get dashboard data
- `GET /api/admin/all-shows` - Get all shows
- `GET /api/admin/all-bookings` - Get all bookings

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for movie data
- [Clerk](https://clerk.com/) for authentication
- [Inngest](https://www.inngest.com/) for background jobs
- [Lucide React](https://lucide.dev/) for icons

---

<div align="center">
  <p>Made with ❤️ by Murari Thakur</p>
</div>