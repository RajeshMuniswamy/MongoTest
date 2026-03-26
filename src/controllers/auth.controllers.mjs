import User from "../models/auth.model.mjs";
import bcrypt from "bcrypt";
import { genToken } from "../util/genToken..util.mjs";

export const signUp = async (req, res) => {
  try {
    console.log("signUp", req.body);
    const { email, user_name, password } = req.body;

    if (!email || !user_name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be greater than 6 characters" });

    const checkUserExist = await User.findOne({ email });
    if (checkUserExist)
      return res.status(400).json({ message: "Email already existed" });

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    if (newUser) {
      await genToken(newUser._id, res);

      await newUser.save();

      return res.status(201).json(req.body);
    } else {
      console.log("While creating new user :", error);
    }
  } catch (error) {
    console.log("signup error: ", error);
  }
};

export const login = async (req, res) => {
  try {
    console.log("login ", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await genToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
    });
  } catch (error) {
    console.log("signIn error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: "0",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("logout : ", error);
  }
};
