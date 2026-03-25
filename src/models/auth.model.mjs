import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  age: {
    type: Number,
    validate: {
      validator: function (v) {
        return typeof v === "number";
      },
      message: "Age must be number",
    },
  },
});

const User = mongoose.model("User", userSchema);
export default User;
