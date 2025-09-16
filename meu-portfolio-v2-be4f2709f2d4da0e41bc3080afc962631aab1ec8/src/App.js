import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen">
      <Header onChatOpen={handleChatToggle} />
      
      <main>
        <div id="home">
          <Hero onChatOpen={handleChatToggle} />
        </div>
        
        <div id="about">
          <About />
        </div>
        
        <div id="projects">
          <Projects />
        </div>
        
        <div id="skills">
          <Skills />
        </div>
      </main>

      <div id="contact">
        <Footer />
      </div>

      <Chatbot isOpen={isChatOpen} onToggle={handleChatToggle} />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
