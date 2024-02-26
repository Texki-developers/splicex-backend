import {
  ICustomerLoginBody,
  ICustomerRegisterBody,
} from "../types/requestBody.types";
import {
  ICustomerCollection,
} from "../types/dbStructureTypes";
import {

  createCustomer,
  getCustomerWithEmail,

} from "../queries/user.queries";
import messages from "../utils/constants/messages";
import { passwordToHash } from "../utils/passwordToHash/passwordToHash";
import { passwordValidator } from "../utils/passwordValidator/passwordValidator";
import jwt from "jsonwebtoken";
import { generateJWT } from "../utils/generateJWT/generateJWT";


export const createUserService = (user: ICustomerRegisterBody) => {
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
export const userLoginService = (credential: ICustomerLoginBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { email, password } = credential;
      const user: ICustomerCollection = await getCustomerWithEmail(email);
      const jwtSecret = process.env.JWT_SECRET || "";

      if (user && user?.password) {
        const { _id } = user;
        const isValidPassword = await passwordValidator(
          password,
          user?.password
        );
        if (isValidPassword) {
          const token = await jwt.sign({ user_id: _id }, jwtSecret, {
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

