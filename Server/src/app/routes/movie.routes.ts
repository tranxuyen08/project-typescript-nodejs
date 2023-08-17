import express from 'express';
const routerMovie = express.Router();
import {movieControllerInstance} from '../controllers/movie.controller';
import { uploadmutiple } from '../middlewares/uploadmultiple.mdl';

routerMovie.get('/search', movieControllerInstance.handleSearchTitle);
routerMovie.post('/add-movie', uploadmutiple, movieControllerInstance.handleAddMovie);
routerMovie.get('/popular', movieControllerInstance.handleGetPopular);
routerMovie.get('/rate', movieControllerInstance.handleGetRate);
routerMovie.get('/:id', movieControllerInstance.handleGetMovieDetails);
routerMovie.get('/', movieControllerInstance.handleGetAllMoviePagination);
// routerMovie.get('/', movieControllerInstance.handleGetMovie);
routerMovie.delete('/:id', movieControllerInstance.handleDeleteMovie);
routerMovie.patch('/:id', movieControllerInstance.handleUpdateMovie);

export default routerMovie;
