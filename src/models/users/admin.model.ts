import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  is_super_admin: {
    type: Boolean,
    required: true
  },
  status:{
    type: String,
    default: 'active'
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

export const AdminModel = mongoose.model('Admin', adminSchema)