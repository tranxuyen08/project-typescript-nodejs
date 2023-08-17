import ProductModel from '../models/productsMovie.model'
import { Request,Response } from "express"
import { IMovie } from "../types/types";
class MovieProductsController {

  async handleAddMovie(req: Request, res: Response): Promise<void> {
    const {
      title,
      vote_average,
      release_date,
      overview,
      video,
      typeMovie,
      role_movie,
      popularity,
    }: IMovie = req.body;
    try {
      const movie = await ProductModel.findOne({ title });
      if (movie) {
         res.status(400).json({ msg: "Movie already exists" });
      }
      // Xử lý tên file ảnh
      const backdrop_path =
        "http://localhost:8000/images/" +
        req.files!["backdrop_path"][0].filename;
      const poster =
        "http://localhost:8000/images/" + req.files!["poster"][0].filename;

      // Tạo đối tượng phim mới
      const newMovie = new ProductModel({
        title,
        vote_average,
        release_date,
        overview,
        video,
        typeMovie,
        backdrop_path,
        poster,
        role_movie,
        popularity,
      });

      // Lưu dữ liệu
      await newMovie.save();
      res.status(200).json({ msg: "Add Movie Successfully" });
    } catch (err) {
      // Xử lý lỗi và gửi chi tiết lỗi về client
      console.error("Error handling add movie:", err);
      res.status(500).json({ message: "Internal Server Error", error: err });
    }
  }
  // async handleGetMovie(_req: Request, res: Response) {
  //   try {
  //     const movieAll = await User.find();
  //     res.status(200).json({ data: movieAll });
  //   } catch (error) {
  //     res.status(500).json({ msg: "Server loi" });
  //   }
  // }
  async handleGetAllMoviePagination(req: Request, res: Response) {
    try {
      const page = parseInt(req.query._page as string) || 1;
      const limit = parseInt(req.query._limit as string) || 10;
      const skip = (page - 1) * limit;
      const totalMovie = await ProductModel.find();
      const movies = await ProductModel.find().skip(skip).limit(limit);
      res.status(200).json({
        data: movies,
        pagination: {
          _limit: limit,
          _page: page,
          _totalMovie: totalMovie.length,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Lỗi server" });
    }
  }
  async handleGetMovieDetails(req: Request, res: Response) {
    try {
      const movieDetail = await ProductModel.findById(req.params.id);
      res.status(200).json({ data: movieDetail });
    } catch (error) {
      res.status(500).json({ msg: "Server loi" });
    }
  }
  async handleDeleteMovie(req: Request, res: Response) {
    try {
      const movieDelete = await ProductModel.deleteOne({ _id: req.params.id });
      res.status(200).json({ data: movieDelete });
    } catch (error) {
      res.status(500).json({ msg: "Server loi" });
    }
  }
  //delete all
  async handleDeleteAllMovie(req: Request, res: Response) {
    try {
      const movieDelete = await ProductModel.deleteMany({ _id: req.params.id });
      res.status(200).json({ data: movieDelete });
    } catch (error) {
      res.status(500).json({ msg: "Lỗi server" });
    }
  }
  async handleUpdateMovie(req: Request, res: Response) {
    const {
      title,
      vote_average,
      release_date,
      overview,
      video,
      typeMovie,
      backdrop_path,
      poster,
      role_movie,
      popularity,
    } = req.body;
    try {
      // Tìm và cập nhật bộ phim dựa trên ID sử dụng Mongoose
      const updatedMovie = await ProductModel.findByIdAndUpdate(
        req.params.id,
        {
          title,
          vote_average,
          release_date,
          overview,
          video,
          typeMovie,
          backdrop_path,
          poster,
          role_movie,
          popularity,
        },
        { new: true } // Trả về bộ phim đã được cập nhật
      );

      if (updatedMovie) {
        res.status(200).json({ data: updatedMovie });
      } else {
        res.status(404).json({ msg: "Không tìm thấy bộ phim" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Lỗi server" });
    }
  }
  async handleGetPopular(_req: Request, res: Response) {
    try {
      const popularMovie = await ProductModel.find()
        .sort({
          popularity: -1,
        })
        .limit(5);
      res.status(200).json({ data: popularMovie });
    } catch (err) {
      // Lỗi server
      console.error("Error handling add movie:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async handleGetRate(_req: Request, res: Response) {
    try {
      const rateMovie = await ProductModel.find()
        .sort({
          vote_average: -1,
        })
        .limit(5);
      res.status(200).json({ data: rateMovie });
    } catch (err) {
      // Lỗi server
      console.error("Error handling add movie:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async handleSearchTitle(req: Request, res: Response) {
    const { searchTerm } = req.query;
    try {
      const movies = await ProductModel.find({
        title: { $regex: searchTerm, $options: "i" },
      });
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
  }
}

export const movieControllerInstance = new MovieProductsController();
