import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
import moviesData from "../../data/db";
const dataCache = () => {
    const cachedData = localStorage.getItem('moviedData');
    return cachedData ? JSON.parse(cachedData) : localStorage.setItem('moviedData', JSON.stringify(moviesData));
};

const watchListLocalStorage = () => {
    const getWatchList = localStorage.getItem('watchList');
    return getWatchList ? JSON.parse(getWatchList) : [];
}
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    try {
        const cachedData = dataCache();
        if (cachedData) {
            return cachedData;
        }
        const movies = await axiosInstance.get("https://imdb-top-100-movies.p.rapidapi.com/")
        const data = await movies.data;
        localStorage.setItem('moviedData', JSON.stringify(data));
        return data;
    }
    catch (e) {
        console.log("Error fetching movie: " + e);
        throw e;
    }
})

export const fetchSingleMovie = createAsyncThunk('movies/fetchSingleMovie', async (id) => {
    try {
        const localStorageData = dataCache();
        const getlocalWatchList = watchListLocalStorage();
        const selectedMovie = localStorageData.find((item) => item.id === id);
        const movieCheck = getlocalWatchList.some((item) => item.id === id);
        const result = { ...selectedMovie, movieCheck }
        return result;
    }
    catch (e) {
        console.log("Error fetching movie: " + e);
        throw e;
    }
})

export const fetchWatchList = createAsyncThunk('movies/fetchWatchList', async (movie) => {
    try {
        const watchListData = watchListLocalStorage();
        let movieCheck = watchListData.filter((item) => item.id === movie.id);
        if (movieCheck.length > 0) {
            console.log("Movie already exists");
            return true;
        }
        else {
            let newValue = [...watchListData, movie];
            localStorage.setItem('watchList', JSON.stringify(newValue));
            return false;
        }
    }
    catch (e) {
        console.log("Error fetching movie: " + e);
        throw e;
    }
})

const initialState = {
    movies: [],
    singleMovie: [],
    watchList: [],
    status: "",
    error: null
}

export const MovieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        // fetchMovies: (state, action) => {
        //     state.movies = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(fetchSingleMovie.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSingleMovie.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.singleMovie = action.payload
            })
            .addCase(fetchSingleMovie.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    }
})

export default MovieSlice.reducer