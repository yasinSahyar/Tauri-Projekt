import { useEffect } from "react";

export function useGesture(callback: (gesture: string) => void) {

  useEffect(() => {

    const handleGesture = () => {

      // Fake gesture
      const gesture = "swipeRight";

      callback(gesture);

    };

    const interval = setInterval(handleGesture, 5000);

    return () => clearInterval(interval);

  }, [callback]);

}