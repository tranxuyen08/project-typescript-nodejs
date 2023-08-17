import mongoose, { Document, Types } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role_admin: number;
  role_subscription: number;
  role_active: number;
  avatar: string;
}

export interface IMovie extends Document {
  _id: any;
  title: string;
  vote_average: number;
  release_date: Date;
  overview: string;
  video: string;
  video_trailler: string;
  typeMovie: string[];
  backdrop_path: string;
  poster: string;
  role_movie: 1 | 2; // Giá trị enum thay vì number
  popularity: number;
}
export interface IFavorite extends Document {
  idUser: mongoose.Types.ObjectId | null;
  idMovie: mongoose.Types.ObjectId | null;
}
export interface IComment extends Document {
  idUser: mongoose.Types.ObjectId;
  idMovie: mongoose.Types.ObjectId;
  titleComment: string;
  createdAt: Date;
  updatedAt: Date;
}