const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const getAllUserList = async (req, res, next) => {
  const allUsers = await User.find({});
  res.json({
    count: allUsers.length,
    users: allUsers,
  });
};

const myAccount = (req, res, err) => {
  res.json({
    user: req.user,
  });
};

const loginAccount = async (req, res, next) => {
  try {
    const user = await User.login(req.body.email, req.body.password);

    const token = await user.generateToken();
    res.json({
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

const updateAccount = async (req, res, next) => {
  delete req.body.createdAt;
  delete req.body.updatedAt;

  if (req.body.hasOwnProperty("password")) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  const { error, value } = User.joiValidationForUpdate(req.body);
  if (error) {
    next(error);
  } else {
    try {
      const result = await User.findByIdAndUpdate(
        { _id: req.user._id },
        req.body,
        { new: true, useValidator: true }
      );
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({
          message: "There is no user who has id",
        });
      }
    } catch (err) {
      next(err);
    }
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete({ _id: req.user._id });
    if (result) {
      return res.status(200).json({
        message: "User is deleted.",
      });
    } else {
      throw createError(404, "User is not found");
    }
  } catch (err) {
    next(createError(400, err));
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete({ _id: req.params.id });
    if (result) {
      return res.status(200).json({
        message: "User is deleted.",
      });
    } else {
      throw createError(404, "User is not found");
    }
  } catch (err) {
    next(createError(400, err));
  }
};

const addUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    const { error, value } = user.joiValidation(req.body);
    if (error) {
      next(error);
    } else {
      const result = await user.save({ new: true, runValidator: true });
      if (result) {
        return res.status(200).json(result);
      }
    }
  } catch (err) {
    next(createError(400, err));
  }
};
const deleteAllUsers = async (req, res, next) => {
  try {
    const result = await User.deleteMany({ isAdmin: false });
    if (result) {
      return res.status(200).json({
        message: "All Users is deleted.",
      });
    } else {
      throw createError(404, "User is not found");
    }
  } catch (err) {
    next(createError(400, err));
  }
};

const updateUserAccount = async (req, res, next) => {
  delete req.body.createdAt;
  delete req.body.updatedAt;

  if (req.body.hasOwnProperty("password")) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  const { error, value } = User.joiValidationForUpdate(req.body);
  if (error) {
    next(error);
  } else {
    try {
      const result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, useValidator: true }
      );
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json({
          message: "There is no user who has id",
        });
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports = {
  getAllUserList,
  myAccount,
  loginAccount,
  updateAccount,
  deleteAccount,
  addUser,
  deleteUser,
  deleteAllUsers,
  updateUserAccount,
};
