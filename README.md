# AI-Powered Gesture Controlled Portfolio

## Project Description

This project is an **interactive AI-powered portfolio application** that demonstrates modern web technologies, computer vision, and artificial intelligence.

The application allows users to navigate a portfolio using **hand gestures detected by the webcam**, while an integrated **AI assistant** can answer questions about the developer's skills and projects.

The goal of this project is to demonstrate the use of **modern frontend frameworks, AI tools, and computer vision technologies** in a real-world portfolio application.

This project was developed as part of a course assignment at **Metropolia University of Applied Sciences**.

---

# Key Features

## Gesture Controlled Navigation

The application uses **computer vision** to detect hand gestures through the webcam and control navigation between pages.

Supported gestures:

| Gesture | Action |
|------|------|
| ✋ Open Palm | Navigate to Contact page |
| 👊 Closed Fist | Navigate to Home page |
| 👍 Thumb Up | Navigate to Projects page |
| ✌ Victory Sign | Navigate to Skills page |

This functionality is implemented using **real-time hand tracking and gesture recognition**.

---

## Real-Time Hand Landmark Visualization

The application visualizes the **hand landmarks detected by the AI model** directly on top of the webcam feed.

This provides real-time feedback showing how the gesture recognition system tracks the user's hand.

---

## Face Detection

The system detects when a person appears in front of the camera.

When a face is detected, the application displays a greeting message:



This simulates recognizing when a recruiter or visitor is viewing the portfolio.

---

## AI CV Assistant

The application includes an **AI assistant that can answer questions about the developer**.

Users can ask questions such as:



The assistant responds using a **local large language model (LLM)** running on the user's machine.

---

# Modern Technologies Used

This project highlights the use of **modern web development and AI technologies**.

## Frontend

- React
- TypeScript
- Vite

React provides a component-based architecture for building interactive user interfaces.

TypeScript ensures better maintainability and type safety.

Vite is used as a modern and fast build tool.

---

## Desktop Application Framework

- Tauri

Tauri allows the application to run as a **lightweight cross-platform desktop application**.

Compared to traditional desktop frameworks, Tauri provides:

- lower memory usage
- improved performance
- enhanced security

---

## Computer Vision

- MediaPipe Vision Tasks

MediaPipe is used for:

- real-time hand tracking
- gesture recognition
- face detection

The AI models run directly in the browser using **WebAssembly and WebGL acceleration**.

---

## Artificial Intelligence

- Ollama
- Llama3 Local Large Language Model

The AI assistant runs using a **local LLM model**, meaning:

- no external AI API is required
- the application works offline
- user data remains private

This demonstrates the integration of **local AI systems into web applications**.

---


The project follows a **modular architecture**, separating:

- UI components
- application pages
- computer vision logic
- data management

This structure improves maintainability and scalability.

---

# Installation

Clone the repository:


This launches the **desktop application with camera access and gesture recognition enabled**.

---

# Running the AI Assistant

Install Ollama:

https://ollama.com

Download the AI model:




# 🌐 Live Demo

You can test the deployed version of the project here:

🔗 **[Open the Live Portfolio](https://users.metropolia.fi/~yasinsay/dist01/)**


 https://users.metropolia.fi/~yasinsay/dist01/