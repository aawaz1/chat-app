"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from '../../components/Header'
import { ToastContainer } from "react-toastify";


const Layout = ({children})=> {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => { 
    
    const token = sessionStorage.getItem("token"); 

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push('/auth/login'); 
    }
  }, [router]);
  return (
    <>
    <Header/>
    {children}
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
    </>
   
  );
};

export default Layout;
