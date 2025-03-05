"use client"
import React, { useState } from "react";
import { CgDetailsLess ,CgDetailsMore } from "react-icons/cg";
import { PiPassword } from "react-icons/pi";
import BasicDetails from './_components/BasicDetails'
import AdditionalDetails from './_components/AdditionalDetails'
import ChangePassword from './_components/ChangePassword'
import { ToastContainer } from "react-toastify";


const Page = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="p-0 md:p-4 md:px-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Tab Navigation */}
      <div className="flex w-full max-w-[400px] md:max-w-[800px] overflow-x-auto space-x-4 border-b mb-4 scrollbar-hide">
  <button
    className={`py-2 flex whitespace-nowrap items-center gap-2 cursor-pointer hover:text-blue-950 hover:border-blue-950 hover:border-b-2 px-4 ${
      activeTab === "basic"
        ? "border-b-2 border-blue-950 text-blue-950"
        : "text-gray-500"
    }`}
    onClick={() => setActiveTab("basic")}
  >
    <CgDetailsLess className="text-lg flex-shrink-0" />
    <span>Basic Details</span>
  </button>
  <button
    className={`py-2 flex whitespace-nowrap items-center gap-2 cursor-pointer hover:text-blue-950 hover:border-blue-950 hover:border-b-2 px-4 ${
      activeTab === "additional"
        ? "border-b-2 border-blue-950 text-blue-950"
        : "text-gray-500"
    }`}
    onClick={() => setActiveTab("additional")}
  >
    <CgDetailsMore className="text-lg flex-shrink-0" />
    <span>Additional Details</span>
  </button>
  <button
    className={`py-2 flex whitespace-nowrap items-center gap-2 cursor-pointer hover:text-blue-950 hover:border-blue-950 hover:border-b-2 px-4 ${
      activeTab === "password"
        ? "border-b-2 border-blue-950 text-blue-950"
        : "text-gray-500"
    }`}
    onClick={() => setActiveTab("password")}
  >
    <PiPassword className="text-lg flex-shrink-0" />
    <span>Change Password</span>
  </button>
</div>




      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "basic" && <BasicDetails/>}
        {activeTab === "additional" && <AdditionalDetails/>}
        {activeTab === "password" && <ChangePassword />}
      </div>
      <ToastContainer 
               position="top-right"
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="colored"
             />
    </div>
  );
};

export default Page;