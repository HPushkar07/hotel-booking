import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const RegisterHotel = () => {

  const {axios, navigate} = useContext(AppContext);

  const [data, setData] = useState({
    hotelName: "",
    hotelAddress: "",
    rating: "",
    price: "",
    amenities: "",
    image: null,
  });

  const hadleChange = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value });
  };

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setData({...data, image: selectedFile });
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handlerSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('hotelName', data.hotelName);
    formData.append('hotelAddress', data.hotelAddress);
    formData.append('rating', data.rating);
    formData.append('price', data.price);
    formData.append('amenities', data.amenities);
    formData.append('image', file);
    
    try {
      const {data} = await axios.post('/api/hotel/register', formData);
      if (data.success) {
        toast.success(data.message);
        navigate('/owner');
      }
      else{
        toast.error(data.message);
      }
    } 
    catch (error) {
       toast.error("Something went wrong");
       console.error(error);
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
            <form onSubmit={handlerSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Hotel Image</p>
                    <div className="w-full my-4">

                      {preview && (
                        <div className="mb-3 flex justify-center ">
                          <img src={preview} alt=""  className="w-24 h-24 object-cover rounded-shadow"/>
                        </div>
                      )}
                    {/* file uplaod Input text here */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100 cursor-pointer"
                    />

                    </div>

                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Hotel Name</label>
                    <input name="hotelName" value={data.hotelName} onChange={hadleChange} type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Hotel Address</label>
                    <textarea name="hotelAddress" value={data.hotelAddress} onChange={hadleChange} rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>

                



                 <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Rating</label>
                        <input name="rating" value={data.rating} onChange={hadleChange} type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                   
                </div>

                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Price</label>
                        <input  name="price" value={data.price} onChange={hadleChange} type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                   
                </div>

                 <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Hotel Amenities</label>
                    <textarea name="amenities" value={data.amenities} onChange={hadleChange} rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>


                <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded">Register Hotel</button>
            </form>
        </div>
  )
}

export default RegisterHotel
