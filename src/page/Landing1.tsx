import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const features = [
  "Smart task organization",
  "Team collaboration tools",
  "Customizable task priorities",
  "Seamless device synchronization",
  "AI-powered productivity insights",
];

export default function LandingPage() {
  const navigate = useNavigate();
  const selectUser = (state:any) => state.auth.user?.user;
  const user = useSelector(selectUser);

  const handleNavigation = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-10 max-w-5xl w-full mx-6">
        <nav className="flex justify-between items-center mb-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-extrabold text-[#ff9800] tracking-wide">TaskMaster</h1>
          </motion.div>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700" onClick={() => navigate("/login")}>Sign In</Button>
            <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={() => navigate("/signUp")}>Sign Up</Button>
          </motion.div>
        </nav>

        <main className="text-center">
          <motion.h2
            className="text-5xl font-bold mb-6 text-gray-200"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Elevate Your Productivity
          </motion.h2>
          <motion.p
            className="text-lg mb-10 text-gray-300 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Take control of your tasks with smart organization and collaboration tools.
          </motion.p>

          <motion.div
            className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 bg-gray-900/70 p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <CheckCircle className="text-green-400" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={handleNavigation}>Start Now</Button>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">Learn More</Button>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
