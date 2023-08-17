import express from "express"

const routerFavorite = express.Router();
import {FavoriteControllerIStance} from '../controllers/favorite.controller'
import checkAuthentication from "../middlewares/checkAuth";

routerFavorite.get('/',checkAuthentication, FavoriteControllerIStance.handleGetLikeMovie)
routerFavorite.post('/',checkAuthentication,FavoriteControllerIStance.handleLikeMovie)

routerFavorite.delete('/:id', checkAuthentication,FavoriteControllerIStance.handleDeleteFavorite)

export default routerFavorite
