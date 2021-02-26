import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

// Get my profile
const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  let followersList = [];
  let followingList = [];

  for (let i = 0; i < user.followers.length; i++) {
    const name = await User.findById(user.followers[i]).select([
      'name',
      'image'
    ]);
    followersList.push(name);
  }

  for (let i = 0; i < user.following.length; i++) {
    const name = await User.findById(user.following[i]).select([
      'name',
      'image'
    ]);
    followingList.push(name);
  }

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      followers: followersList,
      following: followingList
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update Profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Follow
const follow = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id }
    },
    {
      new: true
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId }
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

// UnFollow
const unFollow = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id }
    },
    {
      new: true
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId }
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

// Get All Users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get User By ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  getMyProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  follow,
  unFollow
};
