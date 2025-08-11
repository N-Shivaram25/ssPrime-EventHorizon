import { motion } from "framer-motion";

interface AnimatedCheckProps {
  isVisible?: boolean;
  size?: number;
  className?: string;
  onComplete?: () => void;
}

export default function AnimatedCheck({ 
  isVisible = true, 
  size = 24, 
  className = "",
  onComplete 
}: AnimatedCheckProps) {
  const checkVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, ease: "easeInOut" },
        opacity: { duration: 0.2 }
      }
    }
  };

  const circleVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.6, ease: "easeInOut" },
        opacity: { duration: 0.2 }
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      onAnimationComplete={onComplete}
    >
      {/* Circle background */}
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        variants={circleVariants}
        className="text-green-500"
      />
      
      {/* Check mark */}
      <motion.path
        d="M7 12L10 15L17 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={checkVariants}
        className="text-green-500 animate-draw"
      />
    </motion.svg>
  );
}

export function AnimatedHeart({ 
  isVisible = true, 
  size = 24, 
  className = "",
  onComplete 
}: AnimatedCheckProps) {
  const heartVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-red-500 ${className}`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={heartVariants}
      onAnimationComplete={onComplete}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </motion.svg>
  );
}

export function AnimatedStar({ 
  isVisible = true, 
  size = 24, 
  className = "",
  onComplete 
}: AnimatedCheckProps) {
  const starVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: {
      scale: [0, 1.3, 1],
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-yellow-500 ${className}`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={starVariants}
      onAnimationComplete={onComplete}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </motion.svg>
  );
}