import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    editedAt: Date,
    comments: [{
        user_id: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }
    }],
    likes: [String],
}, {timestamps: true})

export const BlogModel = mongoose.model('Blog',BlogSchema)