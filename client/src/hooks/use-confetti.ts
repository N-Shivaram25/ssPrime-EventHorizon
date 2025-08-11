import { useCallback } from "react";
import confetti from "canvas-confetti";

export function useConfetti() {
  const triggerSuccess = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const triggerDelete = useCallback(() => {
    confetti({
      particleCount: 50,
      spread: 45,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#ee5a24', '#feca57']
    });
  }, []);

  const triggerThemeChange = useCallback(() => {
    const end = Date.now() + (3 * 1000);
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  const triggerHeartEffect = useCallback(() => {
    const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 });
    
    confetti({
      shapes: [heart],
      particleCount: 15,
      spread: 100,
      origin: { y: 0.6 }
    });
  }, []);

  return {
    triggerSuccess,
    triggerDelete,
    triggerThemeChange,
    triggerHeartEffect
  };
}