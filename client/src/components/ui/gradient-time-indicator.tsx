import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimeGradient {
  background: string;
  time: string;
}

const timeGradients: TimeGradient[] = [
  { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", time: "Dawn" }, // 5-7 AM
  { background: "linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)", time: "Morning" }, // 7-11 AM
  { background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", time: "Midday" }, // 11 AM-2 PM
  { background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)", time: "Afternoon" }, // 2-6 PM
  { background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", time: "Evening" }, // 6-8 PM
  { background: "linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)", time: "Night" }, // 8 PM-12 AM
  { background: "linear-gradient(135deg, #2c3e50 0%, #4a6741 100%)", time: "Late Night" }, // 12-5 AM
];

export default function GradientTimeIndicator() {
  const [currentGradient, setCurrentGradient] = useState(timeGradients[1]);

  useEffect(() => {
    const updateGradient = () => {
      const now = new Date();
      const hour = now.getHours();

      let gradientIndex = 1; // Default to morning

      if (hour >= 5 && hour < 7) gradientIndex = 0; // Dawn
      else if (hour >= 7 && hour < 11) gradientIndex = 1; // Morning
      else if (hour >= 11 && hour < 14) gradientIndex = 2; // Midday
      else if (hour >= 14 && hour < 18) gradientIndex = 3; // Afternoon
      else if (hour >= 18 && hour < 20) gradientIndex = 4; // Evening
      else if (hour >= 20 || hour < 0) gradientIndex = 5; // Night
      else gradientIndex = 6; // Late Night

      setCurrentGradient(timeGradients[gradientIndex]);
    };

    updateGradient();
    const interval = setInterval(updateGradient, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 opacity-20 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 0.2,
        background: currentGradient.background
      }}
      transition={{ 
        duration: 2,
        ease: "easeInOut"
      }}
      style={{
        background: currentGradient.background,
      }}
    />
  );
}

export function useTimeGradient() {
  const [currentTime, setCurrentTime] = useState("Morning");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 5 && hour < 7) setCurrentTime("Dawn");
      else if (hour >= 7 && hour < 11) setCurrentTime("Morning");
      else if (hour >= 11 && hour < 14) setCurrentTime("Midday");
      else if (hour >= 14 && hour < 18) setCurrentTime("Afternoon");
      else if (hour >= 18 && hour < 20) setCurrentTime("Evening");
      else if (hour >= 20 || hour < 0) setCurrentTime("Night");
      else setCurrentTime("Late Night");
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
}