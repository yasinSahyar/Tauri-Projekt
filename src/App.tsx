import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import PortfolioLayout from "./components/PortfolioLayout";
import CameraGesture from "./components/CameraGesture";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function GestureController() {

  const navigate = useNavigate();

  function handleGesture(gesture: string) {

    if (gesture === "Open_Palm") {

      navigate("/contact");

    }

    if (gesture === "Closed_Fist") {

      navigate("/");

    }

    if (gesture === "Thumb_Up") {

      navigate("/projects");

    }

    if (gesture === "Victory") {

      navigate("/skills");

    }

  }

  return <CameraGesture onGesture={handleGesture} />;

}

function App() {

  return (

    <BrowserRouter>

      <GestureController />

      <PortfolioLayout>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>

      </PortfolioLayout>

    </BrowserRouter>

  );

}

export default App;