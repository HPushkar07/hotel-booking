import express from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { isOwner } from "../middlewares/isOwner.js";
import {
  getOwnerHotels,
  registerHotel,
  getAllHotels,
  deleteHotel,
} from "../controllers/hotel.controller.js";
import { upload } from "../configs/multer.js";
const hotelRouter = express.Router();

hotelRouter.post(
  "/register",
  upload.single("image"),
  isAuthenticated,
  isOwner,
  registerHotel
);

hotelRouter.get("/get", isAuthenticated, isOwner, getOwnerHotels);
hotelRouter.get("/get-all", getAllHotels); 
hotelRouter.delete("/:id", isAuthenticated, isOwner, deleteHotel);

export default hotelRouter;