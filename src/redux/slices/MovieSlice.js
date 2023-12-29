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
        // const movies = await axiosInstance.get("https://imdb-top-100-movies.p.rapidapi.com/")
        // const data = await movies.data;
        localStorage.setItem('moviedData', JSON.stringify(moviesData));
        return moviesData;
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

export const addWatchList = createAsyncThunk('movies/fetchWatchList', async (movie) => {
    try {
        const watchListData = watchListLocalStorage();
        let movieCheck = watchListData.filter((item) => item.id === movie.id);
        if (movieCheck.length > 0) {
            console.log("Movie already exists");
        }
        else {
            let newValue = [...watchListData, movie];
            localStorage.setItem('watchList', JSON.stringify(newValue));
            return newValue;
        }
    }
    catch (e) {
        console.log("Error fetching movie: " + e);
        throw e;
    }
})

export const fetchWatchListLocal = createAsyncThunk('movies/fetchWatchListLocal', async () => {
    try {
        const fetchedWatchListData = watchListLocalStorage();
        return fetchedWatchListData;
    }
    catch (e) {
        console.log("Error fetching watchlist: " + e);
        throw e;
    }
})

export const removeMoviefromList = createAsyncThunk('movies/removeMoviefromList', async (removeMovie) => {
    try {
        const watchListData = watchListLocalStorage();
        const newList = watchListData.filter((item) => item.id !== removeMovie.id);
        localStorage.setItem('watchList', JSON.stringify(newList));
        return newList;
    }
    catch (e) {
        console.log("Error remove movie: " + e);
        throw e;
    }
})

export const fetchMovieSearch = createAsyncThunk('movies/fetchMovieSearch', async (searchInput) => {
    try {
        const movieData = dataCache();
        const searchMovie = movieData.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()));
        return searchMovie;
    }
    catch (e) {
        console.log("Error fetching searched value: " + e);
        throw e;
    }
})

export const resetSearchList = createAsyncThunk('movies/resetSearchList', async () => {
    try {
        let newSearchList = [];
        return newSearchList;
    }
    catch (e) {
        console.log("Error fetching searched value: " + e);
        throw e;
    }
})

const initialState = {
    movies: [],
    singleMovie: [],
    watchList: [],
    searchList: [],
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
            .addCase(fetchWatchListLocal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWatchListLocal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.watchList = action.payload;
            })
            .addCase(fetchWatchListLocal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(removeMoviefromList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.watchList = action.payload;
            })
            .addCase(addWatchList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.watchList = action.payload;
            })
            .addCase(fetchMovieSearch.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchList = action.payload;
            })
            .addCase(resetSearchList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchList = action.payload;
            })
    }
})

export default MovieSlice.reducer