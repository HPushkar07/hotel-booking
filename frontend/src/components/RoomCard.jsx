import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RoomCard = ({ room }) => {
  const {navigate} = useContext(AppContext);
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="rounded-xl shadow-xl overflow-hidden bg-white px-3 md:px-5">
        <img src={`http://localhost:3000/${room.images[0]}`} alt="" className="w-full h-52 object-cover" />
        <h1 className="mt-3 px-4 pt-3 mb-1 text-lg font-semibold text-heading">
          {room.roomType}
        </h1>
        <div className="flex items-center gap-4 justify-between">
          <p className="text-sm px-4 text-gray-600">
            ${room.pricePerNight}/per night
          </p>

          <button onClick={() => {
            navigate(`/room/${room._id}`);
            window.scrollTo({top: 0, behavior: 'smooth' });
            }}
            className="bg-primary text-white px-4 py-2 mb-3 rounded-md cursor-pointer hover:bg-primary/80 transition-all duration-300"
            >

            See Details
          </button>

        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;