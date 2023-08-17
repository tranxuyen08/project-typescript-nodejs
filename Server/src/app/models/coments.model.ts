import mongoose, { Schema } from "mongoose";
import { IComment } from "../types/types";


const COLLECTION_NAME = "comments";
const DOCUMENT_NAME = "Comment";

const CommentsSchema: Schema<IComment> = new Schema(
  {
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    idMovie: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductMovie', required: true },
    titleComment: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const CommentsModel =  mongoose.model<IComment>(DOCUMENT_NAME, CommentsSchema);
export default CommentsModel;
