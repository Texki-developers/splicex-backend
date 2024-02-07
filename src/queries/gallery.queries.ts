import { GalleryModel } from "../models/Gallery/gallery.model";
import { IGalleryBody } from "../types/requestBody.types";

export const saveImagedata = async (body: IGalleryBody) => {
  let contactForm = new GalleryModel({
    ...body,
  });
  return await contactForm.save();
};

export const getPaginatedImage = async (
  limit: number,
  page: number,
  type: string | undefined
) => {
  const query = type ? { type } : {};
  const totalCount = await GalleryModel.countDocuments(query);

  const images = await GalleryModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

    return{
      images,totalCount
    }
};

export const deleteImage = async (id: string | undefined) => {
  return GalleryModel.deleteOne({ _id: id });
};
