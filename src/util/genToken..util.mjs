import jwt from "jsonwebtoken";

export const genToken = async (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    // res.cookie("jwt", token, {
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   sameSite: "strict",
    //   secure: process.env.NODE_ENV !== "development",
    // });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // 🔥 REQUIRED
    });

    return token;
  } catch (error) {
    console.log("While generating token:", error);
  }
};
