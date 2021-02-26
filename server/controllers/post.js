import asyncHandler from 'express-async-handler';
import Post from '../models/post.js';

// CREATE POST
const createPost = asyncHandler(async (req, res) => {
  const { title, body, image } = req.body;

  const post = new Post({
    title,
    body,
    image,
    postedBy: req.user._id
  });

  const createdPost = await post.save();

  res.json(createPost);
});

// GET All POST
const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate({
      path: 'postedBy',
      select: 'name image'
    })
    .sort('-createdAt');

  res.json(posts);
});

// GET MY POSTS
const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ postedBy: req.user._id }).populate({
    path: 'postedBy',
    select: 'name image'
  });

  res.json(posts);
});

// GET POSTS BY USER ID
const getPostsByUserId = asyncHandler(async (req, res) => {
  const posts = await Post.find({ postedBy: req.params.userId });

  res.json(posts);
});

// GET SINGLE POST
const getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// DELETE POST
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
    res.json({ message: 'Post removed' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// UPDATE POST
const updatePost = asyncHandler(async (req, res) => {
  const { title, body, image } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title;
    post.body = body;
    post.image = image;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// LIKE POST
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let updatedPost = await Post.findById(id);

  const isliked = updatedPost.likes.includes(req.user._id);

  console.log(isliked);

  if (isliked) {
    updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
  } else {
    updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: req.user._id } },
      { new: true }
    );
  }

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { updatedPost },
    { new: true }
  ).populate({
    path: 'postedBy',
    select: 'name image'
  });

  res.status(200).json(post);
});

// ADD COMMENT
const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    const comment = {
      text: req.body.text,
      name: req.user.name,
      image: req.user.image,
      user: req.user._id
    };

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    ).populate({
      path: 'postedBy',
      select: 'name image'
    });

    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// UPDATE COMMENT
const updateComment = asyncHandler(async (req, res) => {
  let commentId = req.body.commentId;
  let post = await Post.findById(req.params.id);

  if (post) {
    await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    const newComment = {
      text: req.body.text,
      name: req.user.name,
      image: req.user.image,
      user: req.user._id
    };

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment } },
      { new: true }
    ).populate({
      path: 'postedBy',
      select: 'name image'
    });

    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// Delete Comment
const deleteComment = asyncHandler(async (req, res) => {
  let comment = req.body.comment;
  let post = await Post.findById(req.params.id);

  if (post) {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: { _id: comment._id } } },
      { new: true }
    ).populate({
      path: 'postedBy',
      select: 'name image'
    });

    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

export {
  createPost,
  getAllPost,
  deletePost,
  likePost,
  getSinglePost,
  updatePost,
  addComment,
  deleteComment,
  getMyPosts,
  getPostsByUserId,
  updateComment
};
