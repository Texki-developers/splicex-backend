import { deleteImage, getPaginatedImage, saveImagedata } from "../queries/gallery.queries";
import { IGalleryBody } from "../types/requestBody.types";
import messages from "../utils/constants/messages";
import { uploadimage } from "../utils/fileUpload/fileUpload";

export const saveImageService = (body: IGalleryBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      body.image = await uploadimage(body.image);
      await saveImagedata(body);
      return resolve(messages.success.SUBMIT);
    } catch (error: any) {
      return reject(error.message);
    }
  });
};

export const getImageService = (page: number,category:string | undefined) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit: number = 10;
      const data = await getPaginatedImage(limit, page,category);
      return resolve({
        message: messages.success.RETRIEVED_SUCCESSFULLY,
        data: data,
      });
    } catch (error: any) {
      return reject(error.message);
    }
  });
};

export const deleteImageService = (id:string | undefined) => {
    return new Promise(async (resolve, reject) => {
      try {
         await deleteImage(id)
        return resolve(messages.success.DELETED_SUCCESSFULLY);
      } catch (error: any) {
        return reject(error.message);
      }
    });
  };