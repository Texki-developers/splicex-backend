import { Request, Response } from "express";
import {
  addCommentService,
  createBlogService,
  deleteBlogService,
  deleteCommentService,
  editBlogService,
  getAlBlogsService,
  getAllBlogsForAdminService,
  getBlogByIdService,
  likeBlogService,
} from "../services/blog.service";
import { responseHandler } from "../utils/responseHandler/responseHandler";
import { validateJwtToken } from "../utils/validateJWT/validateJWT";
import { getBlogById } from "../queries/blog.queries";
import messages from "../utils/constants/messages";

/**
 * The `createBlogController` function handles the creation of a blog by receiving a request,
 * extracting the request body and thumbnail file, and then calling the `createBlogService` function to
 * create the blog.
 * @param {Request} req - The `req` parameter is the request object that contains information about the
 * incoming HTTP request. It includes properties such as headers, query parameters, request body, and
 * files uploaded with the request.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
export const createBlogController = (req: Request, res: Response) => {
  const { body } = req;
  const thumbnail = (
    req?.files as { [fieldname: string]: Express.Multer.File[] }
  )?.thumbnail;
  createBlogService(body, thumbnail)
    .then((data: any) => {
      responseHandler(
        res,
        "CREATED",
        { slug: data?.slug },
        { message: data.message }
      );
    })
    .catch((error: any) => {
      responseHandler(res, "INTERNAL_SERVER_ERROR", null, { message: error });
    });
}

export const editBlogController = (req: Request, res: Response) => {
  const { body } = req;
  const { params } = req;
  const thumbnailFile = (
    req?.files as { [fieldname: string]: Express.Multer.File[] }
  )?.thumbnailFile;

  editBlogService(body, params?.id, thumbnailFile)
    .then((data: any) => {
      responseHandler(res, "OK", null, { message: data.message });
    })
    .catch((error: any) => {
      responseHandler(res, "INTERNAL_SERVER_ERROR");
    });
};

/**
 * The addCommentController function handles the request to add a comment by validating the JWT token,
 * extracting the user ID from the token, and calling the addCommentService to add the comment.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and body of the response.
 */
export const addCommentController = async (req: Request, res: Response) => {
  const decodedToken: any = await validateJwtToken(req.headers.authorization);
  const data = {
    user_id: decodedToken?.user_id,
    ...req.body,
  };
  addCommentService(data)
    .then((message: any) => {
      responseHandler(res, "CREATED", { ...req.body }, { message });
    })
    .catch((error: any) => {
      responseHandler(res, "INTERNAL_SERVER_ERROR", null, { message: error });
    });
};

/**
 * The above function is an asynchronous controller function in TypeScript that retrieves all blogs and
 * sends a response with the blogs data.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It contains methods and properties that allow you to control the
 * response, such as setting the status code, headers, and sending the response body.
 */
export const getAllBlogsController = async (req: Request, res: Response) => {
  const { params } = req;

  getAlBlogsService(parseInt(params?.page))
    .then((data: any) => {
      responseHandler(
        res,
        "OK",
        { blogs: data.blogs, total_counts: data.count },
        { message: data.message }
      );
    })
    .catch((error: any) => {
      responseHandler(res, "INTERNAL_SERVER_ERROR");
    });
};

/**
 * The function `getBlogByIdController` is an asynchronous function that handles a request to get a
 * blog by its ID and sends a response with the blog data or an error message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
export const getBlogByIdController = async (req: Request, res: Response) => {
  const { params } = req;
  const token = req.headers?.authorization?.split(" ")?.[1];
  let user_id: string = "";

  if (token) {
    const decodedToken: any = await validateJwtToken(token);
    user_id = decodedToken?.user_id || "";
  }

  getBlogByIdService(params?.id, user_id)
    .then((data: any) => {
      responseHandler(
        res,
        "OK",
        { blog: data.blog },
        { message: data.message }
      );
    })
    .catch((error: any) => {
      responseHandler(res, "INTERNAL_SERVER_ERROR");
    });
};

export const getAllBlogsForAdminController = async (
  req: Request,
  res: Response
) => {
  getAllBlogsForAdminService()
    .then((blogs) => {
      responseHandler(
        res,
        "OK",
        { blogs },
        { message: messages.success.RETRIEVED_SUCCESSFULLY }
      );
    })
    .catch((error: any) => {
      responseHandler(res, "INTERNAL_SERVER_ERROR");
    });
};

/**
 * The `likeBlogController` function handles the request to like a blog post and returns an appropriate
 * response.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
export const likeBlogController = async (req: Request, res: Response) => {
  const { body } = req;
  const decodedToken: any = await validateJwtToken(req.headers.authorization);

  likeBlogService(body?.slug, decodedToken?.user_id)
    .then((data) => {
      responseHandler(res, "OK");
    })
    .catch((error: any) => {
      responseHandler(res, "INTERNAL_SERVER_ERROR");
    });
};

/**
 * The deleteBlogController function is an asynchronous function that handles the deletion of a blog
 * post and sends an appropriate response to the client.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 */
export const deleteBlogController = async (req: Request, res: Response) => {
  const { params } = req;
  deleteBlogService(params?.id)
    .then((message) => {
      responseHandler(res, "OK", null, { message });
    })
    .catch((error: any) => {
      responseHandler(res, "INTERNAL_SERVER_ERROR", null, { message: error });
    });
};

export const deleteCommentController = (req: Request, res: Response) => {
  const { body } = req;

  deleteCommentService(body?.slug, body?.comment_id)
    .then((message) => {
      responseHandler(res, "OK", { deleted: body }, { message });
    })
    .catch((error: any) => {
      responseHandler(res, "INTERNAL_SERVER_ERROR", null, { message: error });
    });
};
