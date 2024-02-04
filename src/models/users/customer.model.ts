import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  reset_token: {
    type: String,
    default: null,
    allowNull: true
  }
}, { timestamps: true })

export const CustomerModel = mongoose.model('Customer', customerSchema)