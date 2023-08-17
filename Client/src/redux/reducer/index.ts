import reducerUser from './userSlice';
import reducerMovie from './movieSlice';
const rootReducer = {
  users : reducerUser,
  movies: reducerMovie
}

export default rootReducer;