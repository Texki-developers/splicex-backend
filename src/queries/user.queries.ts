import { AdminModel } from "../models/users/admin.model";
import { CustomerModel } from "../models/users/customer.model";
import { IAdminCollection, ICustomerCollection } from "../types/dbStructureTypes";
import { IAdminRegisterBody, ICustomerRegisterBody } from "../types/requestBody.types";
import { createUserID } from "../utils/createUserID/createUserID";

export const createCustomer = async (body: ICustomerRegisterBody) => {
  const newUser = new CustomerModel({
    user_id: createUserID(body.first_name),
    ...body
  });
  return await newUser.save();
}

export const getCustomerWithID = async (id: string) => {
  return await CustomerModel.findOne({ user_id: id })
}

export const getAllCustomers = async () => {
  return await CustomerModel.find({}, {
    user_id: 1,
    first_name: 1,
    last_name: 1,
    email: 1,
    phone: 1,
    createdAt: 1

  }).sort({ createdAt: -1 }) as ICustomerCollection
}

export const getCustomerWithEmail = async (email: string) => {
  return await CustomerModel.findOne({ email }) as ICustomerCollection
}

export const updateCustomerPasswordToken = async (email: string, reset_token: string | null) => {
  return await CustomerModel.updateOne({ email }, { reset_token })
}

export const updateRoleOfAdmin = async (id: string, currentStatus: boolean | undefined) => {
  return await AdminModel.updateOne({ user_id: id }, { is_super_admin: !currentStatus })
}

export const updateCustomerPasswordWithEmail = async (email: string, password: string) => {
  return await CustomerModel.updateOne({ email }, { password, reset_token: null })
}

export const dangerouslyUpdateCustomerPassword = async (userID: string, password: string) => {
  return await CustomerModel.updateOne({ user_id: userID }, { password, reset_token: null })
}

export const createAdmin = async (body: IAdminRegisterBody) => {
  const newAdmin = new AdminModel({
    user_id: createUserID(body.name),
    ...body
  })
  return await newAdmin.save();
}

export const getAdminWithEmail = async (email: string) => {
  return await AdminModel.findOne({ email }) as IAdminCollection
}

export const getAdminWithID = async (user_id: string) => {
  return await AdminModel.findOne({ user_id }) as IAdminCollection
}



