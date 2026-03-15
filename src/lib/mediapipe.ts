import {
  FilesetResolver,
  GestureRecognizer,
  FaceDetector
} from "@mediapipe/tasks-vision";

let vision: any;

export async function loadVision() {

  if (!vision) {

    vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

  }

  return vision;

}

export async function createGestureRecognizer() {

  const vision = await loadVision();

  const recognizer = await GestureRecognizer.createFromOptions(vision, {

    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task"
    },

    runningMode: "VIDEO",
    numHands: 1

  });

  return recognizer;

}

export async function createFaceDetector() {

  const vision = await loadVision();

  const detector = await FaceDetector.createFromOptions(vision, {

    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite"
    },

    runningMode: "VIDEO"

  });

  return detector;

}