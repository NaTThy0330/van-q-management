const { Passenger } = require("../models");
const { hashPassword, comparePassword } = require("../utils/password");
const { createToken } = require("../utils/tokens");
const { HttpStatus } = require("../middleware/error");

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    const existing = await Passenger.findOne({ email });
    if (existing) {
      const error = new Error("Email already registered");
      error.status = HttpStatus.BAD_REQUEST;
      return next(error);
    }

    const passwordHash = await hashPassword(password);
    const passenger = await Passenger.create({
      name,
      email,
      phone,
      passwordHash,
      role: "passenger",
    });

    const token = createToken({
      id: passenger._id,
      email: passenger.email,
      role: passenger.role,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        userId: passenger._id,
        role: passenger.role,
        token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Passenger.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = HttpStatus.UNAUTHORIZED;
      return next(error);
    }

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) {
      const error = new Error("Invalid email or password");
      error.status = HttpStatus.UNAUTHORIZED;
      return next(error);
    }

    const token = createToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await Passenger.findById(req.user.id).select("-passwordHash");
    if (!user) {
      const error = new Error("User not found");
      error.status = HttpStatus.NOT_FOUND;
      return next(error);
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  profile,
};
