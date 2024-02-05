import { Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler/responseHandler";
import {
  IAdminLoginBody,
  IAdminRegisterBody,
  ICustomerForgetPassBody,
  ICustomerLoginBody,
  ICustomerRegisterBody,
} from "../types/requestBody.types";
import {
  IAdminCollection,
  ICustomerCollection,
} from "../types/dbStructureTypes";
import {
  createAdmin,
  createCustomer,
  getAdminWithEmail,
  getAdminWithID,
  getCustomerWithEmail,
  updateCustomerPasswordToken,
  updateCustomerPasswordWithEmail,
} from "../queries/user.queries";
import messages from "../utils/constants/messages";
import { passwordToHash } from "../utils/passwordToHash/passwordToHash";
import { passwordValidator } from "../utils/passwordValidator/passwordValidator";
import jwt from "jsonwebtoken";
import { generateJWT } from "../utils/generateJWT/generateJWT";
import { validateJwtToken } from "../utils/validateJWT/validateJWT";
import { sendMail } from "../utils/sendMail/sendMail";
import { adminLoginMailBody } from "../utils/mailBody/adminLogin";
import { adminLogoutBody } from "../utils/mailBody/adminLogout";
import { createUserID } from "../utils/createUserID/createUserID";
import base64url from "base64url";

/**
 * This function creates a new customer service account by checking if the user already exists, hashing
 * the password, and inserting the user into the database.
 * @param {ICustomerRegisterBody} user - The `user` parameter is an object of type
 * `ICustomerRegisterBody`, which contains the information needed to create a new customer account.
 * This information typically includes the customer's name, email address, password, and any other
 * relevant details.
 * @returns The function `createCustomerService` returns a Promise that resolves to a success message
 * (`messages.success.ACCOUNT_CREATED`) if a new customer account is successfully created, or rejects
 * with an error message (`messages.error.USER_ALREADY_EXIST` or the error message caught in the catch
 * block) if the user already exists or an error occurs during the process.
 */
export const createCustomerService = (user: ICustomerRegisterBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      user.password = await passwordToHash(user.password);
      let insert = await createCustomer({
        ...user,
      });
      let token = await generateJWT({ user_id: insert._id }, "48h");
      return resolve({
        message: messages.success.ACCOUNT_CREATED,
        otherData: {
          token,
          name: user?.name,
        },
      });
    } catch (error: any) {
      return reject(error.message);
    }
  });
};

/**
 * This is a TypeScript function that handles customer login authentication by validating the user's
 * email and password, generating a JWT token, and returning a success message with the token or an
 * error message if the credentials are invalid.
 * @param {ICustomerLoginBody} credential - The `credential` parameter is an object that contains the
 * email and password of a customer trying to log in. It has the type `ICustomerLoginBody`, which is
 * likely an interface defining the shape of the object.
 * @returns A Promise is being returned, which resolves to an object containing a success message and a
 * JWT token if the login is successful, or rejects with an error object if there is an issue with the
 * login process.
 */
export const customerLoginService = (credential: ICustomerLoginBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { email, password } = credential;
      const user: ICustomerCollection = await getCustomerWithEmail(email);
      const jwtSecret = process.env.JWT_SECRET || "";

      if (user && user?.password) {
        const { user_id } = user;
        const isValidPassword = await passwordValidator(
          password,
          user?.password
        );
        if (isValidPassword) {
          const token = await jwt.sign({ user_id: user_id }, jwtSecret, {
            expiresIn: "48h",
          });
          return resolve({
            message: messages.success.LOGGED_IN,
            otherData: {
              token,
              first_name: user?.first_name,
              last_name: user?.last_name,
            },
          });
        } else {
          return reject({
            errorKey: "password",
            message: messages.error.WRONG_PASSWORD,
          });
        }
      } else {
        return reject({
          errorKey: "email",
          message: messages.error.USER_NOT_FOUND,
        });
      }
    } catch (error: any) {
      return reject({
        message: error.message,
      });
    }
  });
};

