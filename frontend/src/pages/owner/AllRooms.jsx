import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from "framer-motion";
import { MapIcon, Star, Edit, Trash2 } from "lucide-react";
import { Link } from 'react-router-dom';
import {toast } from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';

const AllRooms = () => {
  const { navigate, axios } = useContext(AppContext);

  const [roomData, setRoomData] = useState([]);
  const fetchOwnerRooms = async () => {
    try {
      const { data } = await axios.get("/api/room/get");
      if (data.success) {
        setRoomData(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerRooms();
  }, []);

  const deleteRoom = async (roomID) => {
    try {
      const { data } = await axios.delete(`/api/room/delete/${roomID}`);
      if (data.success) {
        toast.success(data.message);
        fetchOwnerRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 rounded-xl shadow-lg p-6 bg-white">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Rooms</h1>
            <p className="text-gray-600 mt-1">
              Manage all of your registered rooms here.
            </p>
          </div>
          <motion.button className="bg-indigo-600 text-white px-6 py-2 rounded-lg cursor-pointer w-full mt-4 md:w-auto md:mt-0"
            onClick={() => navigate("/owner/add-room")}
            whileHover={{ scale: 1.05 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}>
            Add New Room
          </motion.button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Room</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Hotel & Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Price/Night</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Amenities</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* --- UPDATE: Handles the case where there is no room data --- */}
                {roomData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-500">
                      No rooms found. Add a new room to get started!
                    </td>
                  </tr>
                ) : (
                  roomData.map((room, index) => (
                    <tr key={room._id} className={`hover:bg-blue-50/50 transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      
                      {/* 1. Room */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img src={`http://localhost:3000/${room.images[0]}`} alt={room.roomType} className="w-20 h-16 rounded-lg object-cover shadow-sm" />
                          <div>
                            {/* --- UPDATE: Made the room type a clickable link --- */}
                            <Link to={`/room/${room._id}`} className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                              {room.roomType}
                            </Link>
                            <div className="text-sm text-gray-500">{room.isAvailable ? 'Available' : 'Booked'}</div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Hotel & Location */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">{room.hotel.hotelName}</div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapIcon className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{room.hotel.hotelAddress}</span>
                        </div>
                      </td>

                      {/* 3. Rating */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-700 font-semibold">{room.hotel.rating}</span>
                        </div>
                      </td>

                      {/* 4. Price/Night */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">${room.pricePerNight}</span>
                      </td>

                      {/* 5. Amenities */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {room.amenities.split(",").map((amenity, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              {amenity}
                            </span>
                          ))}
                          {/* {room.amenities.length > 2 && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                              +{room.amenities.length - 2} more
                            </span>
                          )} */}
                        </div>
                      </td>
                      
                      {/* 6. Action */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button onClick={()=>deleteRoom(room._id)}   className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;