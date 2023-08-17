import CommentsSchema from "../models/coments.model"
import {Request,Response} from "express"

class CommentsController {
  async handlePostComments(req : Request, res: Response) {
    const idUser = (req as any).user.userId; // id của người dùng từ checkAuther được gửi lên
    console.log("idUser", idUser);
    const { idMovie, titleComment } = req.body;
    try {
      const newComment = new CommentsSchema({ idUser, idMovie, titleComment });
      await newComment.save();
      res.status(200).json({ message: 'Comment posted successfully' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async handleGetComment(req : Request, res: Response) {
    try {
      const movieId = req.params.id; // Lấy id của bộ phim từ request params (ví dụ: "/comments/:movieId")

      const comments = await CommentsSchema.find({ idMovie: movieId }).populate('idUser');
      res.status(200).json({ data: comments });
    } catch (error) {
      res.status(500).json({ msg: "Lỗi máy chủ" });
    }
  }
}

export const CommentsControllerInstance = new CommentsController()
