import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

const MobileFixMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[999] md:hidden">
      <div className="flex justify-between px-4 py-2">
        <div>
          <NavLink
            to="/" target="_top"
            className="flex flex-col items-center text-gray-600 hover:text-indigo-600 duration-200"
          >
            <AiFillHome className="text-2xl" />
            <span className="text-xs">Home</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/products" target="_top"
            className="flex flex-col items-center text-gray-600 hover:text-indigo-600 duration-200"
          >
            <FaShoppingCart className="text-2xl" />
            <span className="text-xs">Shop</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/wishlist" target="_top"
            className="flex flex-col items-center text-gray-600 hover:text-indigo-600 duration-200"
          >
            <FaRegHeart className='text-2xl' />
            <span className="text-xs">Wishlist</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/login" target="_top"
            className="flex flex-col items-center text-gray-600 hover:text-indigo-600 duration-200"
          >
            <CiUser className='text-2xl' />
            <span className="text-xs">Sign in</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileFixMenu;
