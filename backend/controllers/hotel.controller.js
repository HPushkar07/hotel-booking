import Hotel from "../models/hotel.model.js";

// Register a new hotel
export const registerHotel = async (req, res) => {
  // Combine all logic into a single try...catch block
  try {
    const { id } = req.user; // Get owner's ID
    const { hotelName, hotelAddress, rating, price, amenities } = req.body;
    const image = req.file.filename;

    // 1. Validation check
    if (
      !hotelName ||
      !hotelAddress ||
      !rating ||
      !price ||
      !amenities ||
      !image
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // 2. Create and save the new hotel
    const newHotel = new Hotel({
      hotelName,
      hotelAddress,
      rating,
      price,
      amenities,
      image,
      owner: id, // <-- FIX: Add the owner's ID here
    });

    await newHotel.save();

    return res.status(201).json({
      message: "Hotel registered successfully",
      success: true,
      hotel: newHotel,
    });
  } catch (error) {
    // A single catch block handles all potential errors
    return res.status(500).json({ message: error.message, success: false });
  }
};

//get owner hotels
export const getOwnerHotels = async (req, res) => {
  const { id } = req.user;
  try {
    const hotels = await Hotel.find({ owner: id }).populate("owner", "name email");
    return res.status(200).json({
      message: "Hotels fetched successfully",
      success: true,
      hotels,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// Get all hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("owner", "name email");
    return res.status(200).json({
      message: "Hotels fetched successfully",
      success: true,
      hotels,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}

// delete hotel
export const deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found", success: false });
    }
    await Hotel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Hotel deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
} 