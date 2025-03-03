"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from  '../../../components/LoginForm'

const UserLogin = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure it runs only on the client side
      const token = sessionStorage.getItem("token");
      if (token) {
        router.push('/dashboard'); 
      }
    }
  }, [router]);

  return (
    <div className="bg-blue-950 min-h-screen flex justify-center items-center">
       <LoginForm/>
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

export default UserLogin;
