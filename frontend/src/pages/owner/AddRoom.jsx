import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const AddRoom = () => {
  const { axios, navigate } = useContext(AppContext);

  const [roomData, setRoomData] = useState({
    hotel: "",
    roomType: "",
    pricePerNight: "",
    description: "",
    images: [],
    amenities: "", // Updated to a string
    isAvailable: true,
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [hotelData, setHotelData] = useState([]);

  const fetchOwnerHotels = async () => {
    try {
      const { data } = await axios.get("/api/hotel/get");
      if (data.success) {
        setHotelData(data.hotels);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch hotels");
    }
  };

  useEffect(() => {
    fetchOwnerHotels();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...newFiles]);
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviewUrls]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    setPreviews(prevPreviews => prevPreviews.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('hotel', roomData.hotel);
    formData.append('roomType', roomData.roomType);
    formData.append('pricePerNight', roomData.pricePerNight);
    formData.append('description', roomData.description);
    formData.append('isAvailable', roomData.isAvailable);
    formData.append('amenities', roomData.amenities);

    images.forEach(image => {
      formData.append('images', image);
    });

    try {
      const { data } = await axios.post("/api/room/add", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/owner/rooms");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="py-10 flex justify-center bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 space-y-6 max-w-2xl w-full bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">Add a New Room</h1>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="hotel">Select Hotel</label>
          <select name="hotel" value={roomData.hotel} onChange={handleChange} className="outline-none py-2.5 px-3 rounded-md border border-gray-300" required>
            <option value="" disabled>Choose a hotel...</option>
            {hotelData?.map(hotel => (
              <option key={hotel._id} value={hotel._id}>{hotel.hotelName}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="roomType">Room Type</label>
          <input name="roomType" value={roomData.roomType} onChange={handleChange} type="text" placeholder="e.g., Deluxe King Suite" className="outline-none py-2.5 px-3 rounded-md border border-gray-300" required />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="description">Description</label>
          <textarea name="description" value={roomData.description} onChange={handleChange} rows={4} className="outline-none py-2.5 px-3 rounded-md border border-gray-300 resize-none" placeholder="Describe the room..."></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="pricePerNight">Price Per Night</label>
            <input name="pricePerNight" value={roomData.pricePerNight} onChange={handleChange} type="number" placeholder="$0" className="outline-none py-2.5 px-3 rounded-md border border-gray-300" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-base font-medium">Availability</label>
            <div className="flex items-center gap-2 p-2.5">
              <input type="checkbox" id="isAvailable" name="isAvailable" checked={roomData.isAvailable} onChange={handleChange} className="h-4 w-4" />
              <label htmlFor="isAvailable">Is this room available?</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="amenities">Room Amenities</label>
            <p className="text-xs text-gray-500">Enter amenities separated by a comma (e.g., Ocean View, Balcony, Mini Bar)</p>
            <textarea name="amenities" value={roomData.amenities} onChange={handleChange} rows={3} className="outline-none py-2.5 px-3 rounded-md border border-gray-300 resize-none" placeholder="Type here"></textarea>
        </div>

        <div>
          <p className="text-base font-medium">Room Images</p>
          <div className="w-full my-4">
            {previews.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-3">
                {previews.map((src, index) => (
                  <div key={index} className="relative">
                    <img src={src} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover rounded-md shadow-sm"/>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
        </div>

        <button type="submit" className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          Add Room
        </button>
      </form>
    </div>
  )
}

export default AddRoom;