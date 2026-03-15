import { useEffect, useRef } from "react";
import { createGestureRecognizer } from "../lib/mediapipe";

type Props = {
  onGesture: (gesture: string) => void;
};

export default function CameraGesture({ onGesture }: Props) {

  const videoRef = useRef<HTMLVideoElement>(null);
  const recognizerRef = useRef<any>(null);
  const lastVideoTime = useRef<number>(-1);

  useEffect(() => {

    async function init() {

      recognizerRef.current = await createGestureRecognizer();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          requestAnimationFrame(detect);
        };
      }

    }

    function detect() {

      const video = videoRef.current;
      const recognizer = recognizerRef.current;

      if (!video || !recognizer) {
        requestAnimationFrame(detect);
        return;
      }

      // video hazır değilse çalıştırma
      if (
        video.readyState < 2 ||
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        requestAnimationFrame(detect);
        return;
      }

      if (video.currentTime !== lastVideoTime.current) {

        lastVideoTime.current = video.currentTime;

        try {

          const results = recognizer.recognizeForVideo(
            video,
            performance.now()
          );

          if (results.gestures.length > 0) {

            const gesture = results.gestures[0][0].categoryName;

            console.log("Detected gesture:", gesture);

            onGesture(gesture);

          }

        } catch (error) {

          console.warn("Gesture detection error:", error);

        }

      }

      requestAnimationFrame(detect);

    }

    init();

  }, []);

  return (

    <div>

      <h3>Gesture Camera</h3>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={350}
        style={{ border: "2px solid black" }}
      />

    </div>

  );

}