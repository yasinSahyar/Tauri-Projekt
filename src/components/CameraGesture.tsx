import { useEffect, useRef, useState } from "react";
import { createGestureRecognizer, createFaceDetector } from "../lib/mediapipe";

type Props = {
  onGesture: (gesture: string) => void;
};

export default function CameraGesture({ onGesture }: Props) {

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const recognizerRef = useRef<any>(null);
  const faceDetectorRef = useRef<any>(null);

  const lastVideoTime = useRef(-1);

  const [gestureText, setGestureText] = useState("");
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {

    async function init() {

      recognizerRef.current = await createGestureRecognizer();
      faceDetectorRef.current = await createFaceDetector();

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {

        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {

          videoRef.current?.play();
          requestAnimationFrame(detect);

        };

      }

    }

    function drawHandLandmarks(ctx: any, landmarks: any) {

      landmarks.forEach((p: any) => {

        ctx.beginPath();
        ctx.arc(
          p.x * ctx.canvas.width,
          p.y * ctx.canvas.height,
          5,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "red";
        ctx.fill();

      });

    }

    function detect() {

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) {

        requestAnimationFrame(detect);
        return;

      }

      if (video.readyState < 2) {

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

          const results = recognizerRef.current.recognizeForVideo(
            video,
            performance.now()
          );

          if (results.gestures.length > 0) {

            const gesture = results.gestures[0][0].categoryName;

            setGestureText(gesture);

            onGesture(gesture);

          }

          if (results.landmarks) {

            results.landmarks.forEach((hand: any) => {

              drawHandLandmarks(ctx, hand);

            });

          }

          const faces = faceDetectorRef.current.detectForVideo(
            video,
            performance.now()
          );

          if (faces.detections.length > 0) {

            setFaceDetected(true);

          } else {

            setFaceDetected(false);

          }

        } catch (err) {

          console.warn(err);

        }

      }

      requestAnimationFrame(detect);

    }

    init();

  }, []);

  return (

    <div>

      <h3>AI Camera</h3>

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

      <p>
        <b>Gesture:</b> {gestureText || "None"}
      </p>

      {faceDetected && (

        <p style={{ color: "green" }}>
          👋 Hello recruiter!
        </p>

      )}

    </div>

  );

}