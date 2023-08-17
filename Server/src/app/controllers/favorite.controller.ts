// const FavoriteSchema = require("../models/favorite.model");
import { Request, Response } from "express";
import { IFavorite } from "../types/types";
import FavoriteSchema from "../models/favorite.model";

class FavoriteController {
  async handleLikeMovie(req: Request, res: Response) {
    const idUser = (req as any).user.userId;
    const { idMovie } = req.body;
    try {
      const checkFavorite: any = await FavoriteSchema.findOne({
        idUser,
        idMovie,
      }).populate("idMovie");
      if (checkFavorite) {
        await checkFavorite.deleteOne();
        res
          .status(200)
          .json({ message: "Loại bỏ khỏi danh sách yêu thích thành công" });
      } else {
        const newFavorite: IFavorite = new FavoriteSchema({ idUser, idMovie });
        await newFavorite.save();
        res
          .status(200)
          .json({ message: "Bộ phim đã được thêm vào danh sách yêu thích" });
      }
    } catch (err) {
      res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    } finally {
      res.end();
    }
  }
  async handleGetLikeMovie(req: Request, res: Response): Promise<void> {
    const idUser = (req as any).user.userId;; // id của người dùng từ checkAuther được gửi lên
    try {
      const favoriteMovies: Array<object> = await FavoriteSchema.find({
        idUser,
      }).populate("idMovie");
      // if(favoriteMovies.length > 0) {
      //   console.log(22222, favoriteMovies)
      // }
      // .populate('idMovie') // Sử dụng tên trường trong schema, không cần dùng "FavoriteSchema"
      res.status(200).json({ favoriteMovies });
    } catch (err) {
      // Xử lý lỗi nếu có
      console.error(err); // Sử dụng console.error để hiển thị lỗi.
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async handleDeleteFavorite(req: Request, res: Response) {
    const idUser = (req as any).user.userId;;
    try {
      const deleteFavoriteMovie = await FavoriteSchema.deleteOne({
        idUser,
      }).populate("idMovie");
      res.status(200).json({ deleteFavoriteMovie });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export const FavoriteControllerIStance = new FavoriteController();
