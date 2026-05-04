import React, { useState, useEffect } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import Logo from "./Logo";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner } = useAppContext();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 text-gray-700 font-medium sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 py-3" : "bg-transparent border-b border-transparent py-5"}`}
    >
      {/* Left - Logo */}
      <Link to="/">
        <Logo />
      </Link>

      {/* Center - Navigation */}
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full ${scrolled ? "max-sm:top-[56px]" : "max-sm:top-[72px]"} max-sm:border-t border-gray-200/50 right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-6 transition-all duration-300 z-50 max-sm:bg-white/95 max-sm:backdrop-blur-xl sm:bg-transparent ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link
            onClick={(e) => {
              setOpen(false);
              if (link.path !== "/" && !user) {
                e.preventDefault();
                setShowLogin(true);
              }
            }}
            key={index}
            to={link.path}
            className="hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}

        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor/80 px-4 py-0.5 rounded-full max-w-56 bg-white/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <input
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-400"
            placeholder="Search cars"
          />
          <img src={assets.search_icon} alt="search" className="opacity-50" />
        </div>

        {user && (
          <button
            onClick={() => {
              setOpen(false);
              navigate("/your-cars");
            }}
            className="cursor-pointer hover:text-primary transition-colors font-semibold"
          >
            My Cars
          </button>
        )}

        {user && (
          <div
            onClick={() => {
              setOpen(false);
              navigate(isOwner ? "/owner/profile" : "/profile");
            }}
            className="cursor-pointer h-10 w-10 rounded-full border border-gray-300 overflow-hidden hover:shadow-md transition-all"
          >
            <img
              src={user.image || assets.user_profile}
              alt="Profile"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = assets.user_profile;
              }}
            />
          </div>
        )}

        {/* Login/Logout inside mobile menu */}
        <button
          onClick={() => {
            setOpen(false);
            user ? logout() : setShowLogin(true);
          }}
          className="sm:hidden cursor-pointer px-8 py-2.5 bg-primary hover:bg-primary-dull transition-all text-white font-semibold rounded-xl shadow-md hover:shadow-lg mt-4"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>

      {/* Right - Login/Logout (desktop) + Mobile menu toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            user ? logout() : setShowLogin(true);
          }}
          className="hidden sm:block cursor-pointer px-8 py-2.5 bg-primary hover:bg-primary-dull transition-all text-white font-semibold rounded-xl shadow-md hover:shadow-lg"
        >
          {user ? "Logout" : "Login"}
        </button>

        <button
          className="sm:hidden cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;

