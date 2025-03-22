"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { CheckCircle } from "lucide-react"
import { Button } from "../components/ui/button"
export default function ResetSuccessPage() {
  const router = useNavigate()

  const handleBackToLogin=()=>{
    router('/login')
  }


  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center items-center">
      <motion.div
        className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="rounded-full bg-green-500/20 p-4 mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>

          <h2 className="text-4xl font-bold mb-4 text-center text-[#ff9800]">Success!</h2>

          <p className="text-gray-300 text-center mb-8">
            Your password has been reset successfully. You can now log in with your new password.
          </p>

          <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Button
              onClick={handleBackToLogin}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Back to Login
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

