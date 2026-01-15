import React from 'react';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle';
import { useAppContext } from '../../context/AppContext';

const Favourite = () => {
    const {favoritesMovies} = useAppContext();
    return favoritesMovies && favoritesMovies.length > 0 ? (
        <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
            <BlurCircle top="150px" left="0px"/>
            <BlurCircle top="150px" right="50px"/>
            <h1 className='text-lg font-medium my-4'>Your Favourites Movies</h1>
            <div className='flex flex-wrap max-sm:justify-center gap-8'>{favoritesMovies.map((movie) => (
                <MovieCard  
                    key={movie._id}
                    movie={movie}
                />
            ))}
        </div>
        </div>
    ) : (
        <div >
            <h1 className='text-3xl items-center my-44 font-bold text-center'>No Movies Available</h1>
        </div>
    )
}

export default Favourite;