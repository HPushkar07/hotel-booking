import React, { useContext, useState } from 'react'
import {Mail, Lock, User} from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const Signup = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });

     const {navigate, axios } = useContext(AppContext);

    const onChangeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post("/api/user/signup", formData);
        if (data.success) {
          toast.success(data.message);
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  return (
    <div>
      <form onSubmit={submitHandler}
      className="mx-auto mt-36 max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
            <h1 className="text-heading text-3xl mt-10 font-medium">Signup</h1>
            <p className="text-paragraph text-sm mt-2">Please sign up to continue</p>
            <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <User className='w-4 h-4'/>
                <input type="text" name="name" value={formData.name} onChange={onChangeHandler} placeholder="your name" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>

            <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Mail className='w-4 h-4' />
                <input type="email" name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email id" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>
        
            <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Lock  className='w-4 h-4'/>
                <input type="password" name="password" value={formData.password} onChange={onChangeHandler} placeholder="Password" className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>

            <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <select name="role" onChange={onChangeHandler} value={formData.role} className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full">
                <option value="">select your role</option>
                <option value="user">User</option>
                <option value="owner">Owner</option>
              </select>
            </div>

            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                Signup
            </button>
            <p className="text-gray-500 text-sm mt-3 mb-11">Already have an account? <Link to={'/login'}className="text-indigo-500" >login here</Link></p>
        </form>
    </div>
  )
}

export default Signup
