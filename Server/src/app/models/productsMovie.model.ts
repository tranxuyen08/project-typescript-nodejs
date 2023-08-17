import mongoose, { Schema } from "mongoose";
import { IMovie } from "../types/types";

const COLLECTION_NAME = "productsMovie";
const DOCUMENT_NAME = "ProductsMovie";

export const ProductSchema: Schema<IMovie> = new Schema(
  {
    title: { type: String },
    vote_average: { type: Number },
    release_date: { type: Date},
    overview: { type: String},
    video: { type: String},
    typeMovie: { type: [String]},
    backdrop_path: { type: String},
    poster: { type: String}, // poster phim
    role_movie: { type: Number, default: 1, enum: [1, 2]}, //quyen phim duoc xem
    popularity: { type: Number}
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);


const ProductModel =  mongoose.model<IMovie>(DOCUMENT_NAME, ProductSchema);

export default ProductModel