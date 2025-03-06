"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Basic from '../../../../../public/6357048.png'
import {toast} from 'react-toastify'

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
 

  const handleSubmit = (e) => {
    try {
        e.preventDefault();
    
    
        // Validate passwords
        if (newPassword === confirmPassword) {
          toast.success("Passwords match! Changes saved successfully.");
          
        } else {
          toast.error("Passwords do not match. Please try again.");
        }
        
    } catch (error) {
        
    }
   
  };
  return (
    <div className='bg-white border-blue-950 border rounded-2xl'>
     {/* <h1>Basic Details</h1> */}
     <div className='grid space-x-2 grid-cols-1 md:grid-cols-2'>
     <div className="space-y-4">
          <h2 className="text-xl text-gray-900 font-bold my-4 text-center">Change Password</h2>
          <form className='mx-auto max-w-md py-4' onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="text"
                className="w-full p-2 placeholder:text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-[2px] focus:border-blue-950"
                placeholder="Enter your New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* Email Field */}
            <div className="my-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
             Confirm Password
              </label>
              <input
               
                className="w-full  placeholder:text-gray-900 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[2px] focus:border-blue-950" 
                placeholder="Enter your Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

         
         

            {/* Save Button */}
            <button
              type="submit"
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>

        <div className='flex justify-center items-center p-2 bg-gray-400 rounded-bl-2xl rounded-br-2xl  
  md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none'>
            <Image alt='basic' src={Basic} width={200} height={200}/>
        </div>
     </div>
    </div>
  )
}

export default ChangePassword