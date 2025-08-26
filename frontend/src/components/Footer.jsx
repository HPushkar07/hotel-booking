import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="py-16 px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    <img src={assets.logo} alt="" className={`h-16`}  />
                    <p className="mt-6 text-sm">
                        Experience the perfect retreat at Hotel Club La Serena, where modern 
                        comfort meets the timeless charm of Pushkar. We are committed to providing 
                        an exceptional stay with personalized service and serene surroundings, ensuring 
                        every moment of your visit is a cherished memory.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><Link to={'/'}>Home</Link></li>
                            <li><Link to={'/about'}>About us</Link></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Privacy policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+91-8429391365</p>
                            <p>pushhimanshu83@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5 ">
                Copyright 2025 © Pushkar. All Right Reserved.
            </p>
        </footer>

  )
}

export default Footer
