"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { HiAnnotation } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleFill } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import {toast} from 'react-toastify'
import axios from 'axios'
import { useRouter } from "next/navigation";


const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sendRequests , setSendRequests] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/search?q=${searchQuery}`);
        setSearchResults(response.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const debounce = setTimeout(fetchUsers, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleLogOut = () => {
    toast.success("Logged Out Successfully");
    sessionStorage.removeItem('token');

    setTimeout(() => {
      router.push("/auth/login")
      
    }, 1000);

  }


 const handleFriendRequest = (userId) => {
    toast.success("Request Send Successfully")
    setSendRequests((prevRequests) => ({
      ...prevRequests,
      [userId]: true,
    }));
  };




const toggleProfileMenu = () => {
  setIsProfileOpen(!isProfileOpen);
};


  const toggleSideMenu = () => {
    if (isSidebarOpen) {
      setIsClosing(true);
  
      // Step 2: Delay sidebar close (300ms matches animation duration)
      setTimeout(() => {
        setIsSidebarOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsSidebarOpen(true);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden bg-blue-950 md:flex justify-between py-2">
        <div className="logo text-white text-center flex justify-center items-center px-8 text-2xl font-bold">
          ChatVerse
        </div>
        <div className="flex-1 max-w-md mx-8 relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-lg border text-black bg-white outline-none border-blue-950 placeholder-gray-600"
          />
          {searchResults.length > 0 && (
            <ul className="absolute top-12 mt-2 left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
              {searchResults.map((user) => (
                <li key={user.id} className="p-4 hover:bg-gray-200 flex justify-between items-center border-b cursor-pointer ">
                  <span>{user.firstName} {user.lastName}</span>
                  <button 
          className="flex cursor-pointer gap-2 justify-between items-center" 
          onClick={() => handleFriendRequest(user.id)}
        >
          {sendRequests[user.id] ? (
            <>
              <FaUserCheck className="text-lg" /> Request Sent
            </>
          ) : (
            <>
              <IoMdAddCircleOutline className="text-lg" /> Send Request
            </>
          )}
        </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="navbar flex w-[300px] md:w-[500px] text-white text-md justify-between items-center px-12 py-2 gap-8">
          <Link className="text-xl flex justify-between gap-2 items-center" href="/dashboard"><FaHome/> Home</Link>
          <Link className="text-xl flex justify-between gap-2 items-center" href="/dashboard/chat"><HiAnnotation/> Chat</Link>
          <div className="relative group">
            <button className="text-xl cursor-pointer flex justify-between gap-2 items-center focus:outline-none">
              <ImProfile /> Profile
            </button>
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-5 w-30 bg-blue-950 text-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <ul className="py-2 px-1 rounded-xl">
                {/* <li>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                </li> */}
                <li>
                  <Link href="/dashboard/settings" className=" flex items-center justify-between px-4 rounded-md py-2 hover:bg-blue-300">
                   <IoMdSettings/> Settings
                  </Link>
                </li>
                
                  <li onClick={handleLogOut} className="flex cursor-pointer justify-between items-center px-4 py-2 rounded-md hover:bg-blue-300">
                  <RiLogoutCircleFill className="text-lg"/>
                    Logout
                  </li>
                
              </ul>
            </div>
          </div>
        
      
        
       
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden bg-blue-950 text-white flex justify-between w-full py-2 px-2">
        <div className="logo text-white text-md">Chat Verse</div>
        <div className="relative w-2/3">
  <input
    type="text"
    placeholder="Search users..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full p-2 rounded-lg border text-black bg-white outline-none border-blue-950 placeholder-gray-600"
  />
  {searchResults.length > 0 && (
    <ul className="absolute top-full mt-1 left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
      {searchResults.map((user) => (
        <li key={user.id} className="p-4 flex justify-between items-center border-b cursor-pointer hover:bg-blue-300">
          <span>{user.firstName} {user.lastName}</span>
          <p className="bg-blue-500">aaaa</p>
          <button onClick={() => handleFriendRequest(user.id)}>Send Request</button>
        </li>
      ))}
    </ul>
  )}
</div>


        {/* <div className="relative w-12">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/2 p-2 rounded-lg border text-black bg-white outline-none border-blue-950 placeholder-gray-600"
          />
          {searchResults.length > 0 && (
            <ul className="absolute top-12 mt-2 left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
              {searchResults.map((user) => (
                <li key={user.id} className="p-4 flex justify-between items-center border-b cursor-pointer hover:bg-blue-300">
                  <span>{user.firstName} {user.lastName}</span>
                  <button>Send Request</button>
                </li>
              ))}
            </ul>
          )}
        </div> */}
        <motion.div
          className="cursor-pointer"
        
          animate={{ rotate: isSidebarOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
            <div className="flex justify-center items-center  gap-6">
            <FiMenu   onClick={toggleSideMenu} size={24} />
            </div>
            
        </motion.div>
      </div>

      {/* Sidebar Menu with Animation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/50 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSideMenu}
            />

           
         {/* Sidebar */}
<motion.div
  className="fixed top-0 right-0 w-[60%] h-full bg-blue-950 z-30 shadow-lg"
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ duration: 0.3, ease: "easeInOut" }}
>
  <div className="flex justify-between items-center text-white p-4">
    <div></div> {/* To push the close icon to the right */}
    <motion.div
   animate={{ rotate: isClosing ? 50 : 0 }}
   transition={{ duration: 0.3 }} 
  >
    <AiOutlineClose size={24} onClick={toggleSideMenu} className="cursor-pointer" />
    </motion.div>
  </div>

  <div className="flex flex-col text-white text-md gap-4 p-4">
    <Link href="/dashboard" className="flex items-center gap-2">
      <FaHome /> Home
    </Link>
    <Link href="/dashboard/chat" className="flex items-center gap-2">
      <HiAnnotation /> Chat
    </Link>

    {/* Profile with Dropdown */}
    <button 
      className="flex justify-start items-center gap-2 cursor-pointer  focus:outline-none"
      onClick={toggleProfileMenu}
    >
      <ImProfile /> Profile
    </button>

    {isProfileOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-blue-800 rounded-lg mt-2 p-2"
      >
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard/settings" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <IoMdSettings /> Settings
            </Link>
          </li>
          <li
            onClick={handleLogOut} className="flex cursor-pointer items-center gap-2 hover:bg-blue-700 p-2 rounded-md">
              <RiLogoutCircleFill /> Logout
            
          </li>
        </ul>
      </motion.div>
    )}
  </div>
</motion.div>

          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
