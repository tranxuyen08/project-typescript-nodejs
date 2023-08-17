import { Schema } from "mongoose";
import {IFavorite} from '../types/types'

const mongoose = require("mongoose");
// const slug = require("mongoose-slug-generator");

const COLLECTION_NAME = "favorite";
const DOCUMENT_NAME = "Favorite";
const FavoriteSchema: Schema<IFavorite> = new Schema(
  {
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idMovie: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductsMovie', required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
const FavoriteModel = mongoose.model(DOCUMENT_NAME, FavoriteSchema);
export default FavoriteModel;