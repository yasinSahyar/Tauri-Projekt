import { useState } from "react";

export const DBStore = {

  skills: [
    "React",
    "TypeScript",
    "Tauri",
    "Node.js",
    "MediaPipe",
    "Computer Vision"
  ],

  projects: [

    {
      name: "Gesture Controlled Portfolio",
      description: "Portfolio navigated using hand gestures."
    },

    {
      name: "AI CV Assistant",
      description: "Local AI assistant using Ollama and Llama3."
    }

  ]

};

export function useStore() {

  const [skills] = useState(DBStore.skills);
  const [projects] = useState(DBStore.projects);

  return { skills, projects };

}