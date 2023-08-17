
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieAPI } from "../../api/movieApiClient";
import { IMovie } from "../../types/types";



export const getAll = createAsyncThunk('getAll', async(payload : any) =>{
  const res = await MovieAPI.getAllMovie(payload);
  return res.data
})
export const getMovieShowSlide = createAsyncThunk('getShowSlide', async() =>{
  const res = await MovieAPI.getMovieShowSlide()
  return res.data
})
export const getMovieRate = createAsyncThunk('getRate', async() =>{
  const res = await MovieAPI.getMovieRate()
  return res.data
})
export const getMovieSearch = createAsyncThunk('getSearch', async(payload : any) =>{
  const res = await MovieAPI.getMovieSearch(payload)
  return res.data
})

interface MovieState {
  data: Array<IMovie> | [];
  pagination : {
      _limit : number,
      _page : number,
      _totalMovie: number
    }
}

const MovieSlice = createSlice({
  name: 'movie',
  initialState: {
    data: [],
    pagination : {}
  } as MovieState,
  reducers: {},
  extraReducers: (builder : any) =>  {
    builder
    .addCase(getAll.fulfilled, (state : any, action : PayloadAction<MovieState>) => {
      state.data = action.payload.data; // Cập nhật dữ liệu phim
       state.pagination = action.payload.pagination; // Cập nhật dữ liệu phân trang
    })
    .addCase(getMovieShowSlide.fulfilled, (state : any, action : PayloadAction<MovieState>) => {
      state.data = action.payload.data
    })
    .addCase(getMovieRate.fulfilled, (state : any, action : PayloadAction<any>) => {
      state =  action.payload;
    })
    .addCase(getMovieSearch.fulfilled, (state : any, action : PayloadAction< any>) => {
      state = action.payload;
      console.log(state)
    });
  },

});

const {reducer} = MovieSlice;

export default reducer;
