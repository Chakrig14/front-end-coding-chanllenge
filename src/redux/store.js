import { configureStore } from "@reduxjs/toolkit"
import MovieSlice from "./slices/MovieSlice";

const store = configureStore({
    reducer: {
        MovieSlice: MovieSlice
    }
})

export default store;