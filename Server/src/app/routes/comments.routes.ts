import express from 'express';
const routerComment = express.Router();
import {CommentsControllerInstance} from "../controllers/comments.controller"
import checkAuthentication from '../middlewares/checkAuth';

routerComment.post('/',checkAuthentication, CommentsControllerInstance.handlePostComments)
routerComment.get('/:id', CommentsControllerInstance.handleGetComment)

export default routerComment
