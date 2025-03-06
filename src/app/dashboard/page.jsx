"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
    const router = useRouter();
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = sessionStorage.getItem("token");
        if (!token) {
          router.push('/auth/login');
        }
      }
    }, [router]);
  return (
    <div className="min-h-screen flex flex-col justify-between bg-blue-600 to-blue-950 text-white">
    
    

      {/* Hero Section */}
      <section className="flex-1 p-2 md:p-0 flex flex-col justify-center items-center text-center px-10">
        <motion.h2 
          className="text-2xl md:text-5xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Connect. Chat. Collaborate.
        </motion.h2>
        <p className="text-lg max-w-2xl mb-8">
          ChatVerse is your go-to app for seamless messaging, real-time collaboration, and staying connected with your friends and team.
        </p>
        <div className="flex gap-4">
          <Link href="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-300">Get Started</Link>
          <Link href="/login" className="border bg-blue-950 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600">Login</Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white text-blue-900 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-10">Why Choose ChatVerse?</h3>
          <div className="grid p-3 md:p-0 grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-blue-100 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Real-Time Messaging</h4>
              <p>Instant communication with zero delay. Connect with your team like never before.</p>
            </div>
            <div className="p-6 bg-blue-100 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Secure and Private</h4>
              <p>End-to-end encryption ensures your conversations remain confidential.</p>
            </div>
            <div className="p-6 bg-blue-100 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Cross-Platform</h4>
              <p>Use ChatVerse on your phone, tablet, or desktop — anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-blue-950">
        <p>&copy; {new Date().getFullYear()} ChatVerse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
