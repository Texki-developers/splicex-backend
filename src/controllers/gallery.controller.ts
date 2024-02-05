import { deleteImageService, getImageService, saveImageService } from "../services/gallery.service";
import { responseHandler } from "../utils/responseHandler/responseHandler";
import { Request, Response } from "express";


export const saveImageController = (req: Request, res: Response) => {
    const { body } = req;
    
    const galleryImage = (
      req?.files as { [fieldname: string]: Express.Multer.File[] }
    )?.image;
  
    body.image = galleryImage

    saveImageService(body).then((message: any) => {
      responseHandler(res, 'CREATED', null, { message })
    }).catch((errorMessage: string) => {
      responseHandler(res, 'INTERNAL_SERVER_ERROR', null, { message: errorMessage })
    })
  }
  

  export const getImageController = (req:Request,res:Response)=>{

    const page:number=  parseInt(req.query.page as string) || 1
    const type: string | undefined = req.query.type as string | undefined;
    getImageService(page,type).then((data: any) => {
        responseHandler(res, 'OK', { images: data.data }, { message: data.message })
      }).catch((error: string) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null)
      })
  }


  export const deleteImageController = (req:Request,res:Response)=>{

    const id: string | undefined = req.query.id as string | undefined;

   
    deleteImageService(id).then((message: any) => {
        responseHandler(res, 'OK', null, { message })
      }).catch((error: string) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null)
      })
  }