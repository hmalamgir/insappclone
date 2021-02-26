import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    likes: [
      {
        type: ObjectId,
        ref: 'User'
      }
    ],
    comments: [
      {
        text: {
          type: String,
          required: true
        },
        name: { type: String, required: true },
        image: { type: String },
        user: {
          type: ObjectId,
          required: true,
          ref: 'User'
        }
      }
    ],
    postedBy: {
      type: ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
