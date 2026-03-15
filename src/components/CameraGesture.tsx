import { useEffect, useRef, useState } from "react";
import { createGestureRecognizer, createFaceDetector } from "../lib/mediapipe";

type Props = {
  onGesture: (gesture: string) => void;
};

export default function CameraGesture({ onGesture }: Props) {

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gestureRecognizer = useRef<any>(null);
  const faceDetector = useRef<any>(null);

  const lastVideoTime = useRef(-1);

  const [gestureText, setGestureText] = useState("");
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {

    async function init() {

      gestureRecognizer.current = await createGestureRecognizer();
      faceDetector.current = await createFaceDetector();

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

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
      const canvas = canvasRef.current;

      if (!video || !canvas) {

        requestAnimationFrame(detect);
        return;

      }

      if (
        video.readyState < 2 ||
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {

        requestAnimationFrame(detect);
        return;

      }

      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      if (video.currentTime !== lastVideoTime.current) {

        lastVideoTime.current = video.currentTime;

        try {

          const gestureResults = gestureRecognizer.current.recognizeForVideo(
            video,
            performance.now()
          );

          if (gestureResults.gestures.length > 0) {

            const gesture = gestureResults.gestures[0][0].categoryName;

            setGestureText(gesture);
            onGesture(gesture);

          }

          const faceResults = faceDetector.current.detectForVideo(
            video,
            performance.now()
          );

          if (faceResults.detections.length > 0) {

            setFaceDetected(true);

            faceResults.detections.forEach((d: any) => {

              const box = d.boundingBox;

              ctx?.strokeRect(
                box.originX,
                box.originY,
                box.width,
                box.height
              );

            });

          } else {

            setFaceDetected(false);

          }

        } catch (e) {

          console.warn(e);

        }

      }

      requestAnimationFrame(detect);

    }

    init();

  }, []);

  return (

    <div>

      <h3>Camera AI Detection</h3>

      <div style={{ position: "relative", width: "400px" }}>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          width={400}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0
          }}
        />

      </div>

      <p><b>Detected Gesture:</b> {gestureText || "None"}</p>

      {faceDetected && (

        <p style={{ color: "green" }}>
          👋 Hello recruiter detected
        </p>

      )}

    </div>

  );

}