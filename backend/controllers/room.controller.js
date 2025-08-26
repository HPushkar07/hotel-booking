import Room from "../models/room.model.js";

export const addRoom = async (req, res) => {
  try {
    const {roomType, hotel, pricePerNight, description, amenities, isAvailable } = req.body;
    const image= req.files.map(file => file.path);
    const newRoom = await Room.create({
      roomType,
      hotel,
      pricePerNight,
      description,
      images: image,
      amenities,
      isAvailable: isAvailable
    });
    res.status(201).json({ message: "Room added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error adding room", error: error.message });
  }
}



 // get all rooms of specific owner
 export const getOwnerRooms = async (req, res) => {
  try {
    const { id } = req.user;
    const rooms = await Room.find().populate({
      path: "hotel",
      match: { owner: id },
      select: "hotelName hotelAddress rating amenities ",
    });
    const ownerRooms = rooms.filter((room) => room.hotel.owner === id);
    return res.status(200).json({ rooms, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get all rooom for users
 // 2. Get all rooms for users
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate({
        path: "hotel",
        select: "hotelName hotelAddress amenities rating owner", // include owner for nested populate
        populate: {
          path: "owner", // populate the owner from the hotel model
          select: "name email", // choose which owner fields to return
        },
      })
      .exec();

    res.json({ success: true, rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete the room
export const deleteRoom = async (req, res) => {
  try {
    const { roomID } = req.params;

    const deletedRoom = await Room.findByIdAndDelete(roomID);

    if (!deletedRoom) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

