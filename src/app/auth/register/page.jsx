"use client";
import React, { useEffect } from "react";
import  RegisterForm from "../../../components/RegisterForm";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserLogin = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure it runs only on the client side
      const token = sessionStorage.getItem("token");
      if (token) {
        router.push('/'); // Redirect to homepage
      }
    }
  }, [router]);

  return (
    <div className="bg-blue-950 min-h-screen flex justify-center items-center">
      <RegisterForm />
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
