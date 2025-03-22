"use client"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
export default function SuccessPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/login");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-lg p-10 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/10 text-center border border-gray-700">
        <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-400" />
        <h1 className="text-4xl font-extrabold mb-4 text-orange-400">Welcome to FemmeTask!</h1>
        <p className="text-lg mb-8 text-gray-300">Your account has been successfully verified.</p>
        <Button onClick={handleLoginClick} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
          Go to Login
        </Button>
        <p className="text-sm text-gray-400 mt-4">Redirecting to login page in <span className="text-orange-300 font-bold">{countdown}</span> seconds...</p>
      </div>
    </div>
  );
}
