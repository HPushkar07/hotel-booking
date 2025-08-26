import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//signup controller
export const signup = async (req, res) => {
  try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
        return res.json({ message: "all fields are required", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.json({ message: "user already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User({
        name,
        email,
        password: hashedPassword,
        role,
        });
        await newUser.save();
        return res.json({
        message: "user created successfully",
        success: true,
        user: newUser,
        });
    }
    catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    } 
};

//login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "all fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "invalid credentials", success: false });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.json({
      message: "login successful",
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

//logout controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "logout successful", success: true });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
}

// is-auth function
export const isAuth = async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).select("-password");
  try {
    res.json({ success: true, user });
  } catch (error) {
    return res.json({ message: "internal server error", success: false });
  }
};