import React, { useContext } from 'react';
import { Link, Outlet } from "react-router-dom"; 
import { Warehouse, CalendarArrowDown } from "lucide-react";
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
import { assets } from '../../assets/assets';

// It's good practice to define static assets like icons outside the component
const dashboardIcon = (
    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z" />
    </svg>
);

const OwnerLayout = () => {
    const { owner, setOwner,axios } = useContext(AppContext);

    const sidebarLinks = [
        { name: "Dashboard", path: "/owner", icon: dashboardIcon },
        { name: "Rooms", path: "/owner/rooms", icon: <Warehouse  /> },
        { name: "Bookings", path: "/owner/bookings", icon: <CalendarArrowDown /> },
    ];

    const logout = async() => {
       try {
            const { data } = await axios.get("/api/user/logout");
            if (data.success) {
            toast.success(data.message);
            setOwner(false);
            navigate("/");
            } else {
            toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (<>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to={"/owner"}>
                    <img className="h-9" src={assets.logo} />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Owner</p>
                    <button onClick={ logout } className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>


            <div className='flex'>
                 <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item, index) => (
                    <Link to={item.path} key={index}
                        className={`flex items-center py-3 px-4 gap-3 
                            ${index === 0 ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`
                        }
                    >
                        {item.icon}
                        <p className="md:block hidden text-center">{item.name}</p>
                    </Link>
                ))}
            </div>            
            <Outlet/>
            
            </div>
           
            </> 
    );
}

export default OwnerLayout;