import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  alt: {
    type: String,
  }
}, { timestamps: true })

export const GalleryModel = mongoose.model('Gallery', ContactSchema)