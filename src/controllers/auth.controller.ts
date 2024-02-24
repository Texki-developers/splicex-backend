import { Request, Response } from "express";
import {  ICustomerLoginBody, ICustomerRegisterBody } from "../types/requestBody.types";
import { responseHandler } from "../utils/responseHandler/responseHandler";
import {  createUserService, userLoginService } from "../services/auth.service";


export const createUserController = (req: Request, res: Response) => {
  const user: ICustomerRegisterBody = req.body;
  createUserService (user).then((data: any) => {
    responseHandler(res, 'CREATED', data.otherData, { message: data.message })
  }).catch(message => {
    responseHandler(res, 'BAD_REQUEST', null, { message })
  })
}


/**
 * This is a TypeScript function that handles customer login requests by calling a service and
 * returning a response with a token and message.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, URL, and body. In this case,
 * the `req` object is being used to extract the request body, which is expected to contain login
 * credentials for
 * @param {Response} res - `res` is an object representing the HTTP response that will be sent back to
 * the client. It contains methods and properties that allow you to set the response status code,
 * headers, and body. In this specific code snippet, `res` is used to send a response back to the
 * client with a
 */
export const userLoginController = (req: Request, res: Response) => {
  const credential: ICustomerLoginBody = req.body;
  userLoginService(credential).then((data: any) => {
    responseHandler(res, 'OK', data.otherData , { message: data.message })
  }).catch(error => {
    responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error)
  })
}





