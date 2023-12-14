import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios";
const dataCache = () => {
    const cachedData = localStorage.getItem('moviedData');
    return cachedData ? JSON.parse(cachedData) : null;
};
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
        const selectedMovie = localStorageData.filter((item) => item.id === id);
        console.log(selectedMovie);
        return selectedMovie;
    }
    catch (e) {
        console.log("Error fetching movie: " + e);
        throw e;
    }
})

const initialState = {
    movies: [],
    singleMovie: [],
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