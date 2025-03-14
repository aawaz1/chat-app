import Image from 'next/image'
import React from 'react'
import Basic from '../../../../../public/tree.png'

const BasicDetails = () => {
  return (
    <div className='bg-white border-blue-950 border rounded-2xl'>
     {/* <h1>Basic Details</h1> */}
     <div className='grid space-x-2 grid-cols-1 md:grid-cols-2'>
     <div className="space-y-4">
          <h2 className="text-xl text-gray-900 font-bold my-4 text-center">Additional Details</h2>
          <form className='mx-auto max-w-md py-4'>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                className="w-full p-2 placeholder:text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-[2px] focus:border-blue-950"
                placeholder="Enter your Address"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
              Alternative Email
              </label>
              <input
                type="email"
                className="w-full p-2 placeholder:text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-[2px] focus:border-blue-950" 
                placeholder="Enter your Alternative Email"
              />
            </div>

            {/* Username Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Alternative Phone Number
              </label>
              <input
                type="text"
                className="w-full placeholder:text-gray-900 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[2px] focus:border-blue-950"
                placeholder="Enter your Alternative Phone Number"
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

        <div className='flex justify-center items-center bg-gray-400 rounded-bl-2xl rounded-br-2xl  
  md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none'>
            <Image alt='basic' src={Basic} width={300} height={300}/>
        </div>
     </div>
    </div>
  )
}

export default BasicDetails