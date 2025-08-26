export const isOwner = (req, res, next) => {
  try {
    if (req.user && req.user.role === "owner") {
      next();
    } else {
      return res.status(401).json({ message: "User is not Owner", success: false });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};