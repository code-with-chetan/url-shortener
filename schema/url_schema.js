import mongoose from "mongoose";

//*creating Schema
const urlSchema = mongoose.Schema({
  id: { type: Number },
  url: { type: String },
  shortCode: { type: String },
});

//*creating model or collections.
export const urls = mongoose.model("url", urlSchema);
