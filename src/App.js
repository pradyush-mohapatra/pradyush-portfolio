import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import CubeSection from "./CubeSection";
import PencilModel from './PencilModel'; // Adjust path if needed

function App() {
  const [activeTab, setActiveTab] = useState("skills");
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([{ type: "bot", text: "👋 Say hi" }]);
  const inputRef = useRef(null);
  const chatRef = useRef(null);

  const handleTabClick = (tab) => setActiveTab(tab);

  const sendMessage = () => {
    const input = inputRef.current.value.trim();
    if (!input) return;

    const lower = input.toLowerCase();
    const userMsg = { type: "user", text: input };
    let botText = "Please choose one of the predefined questions.";

    if (["hi", "hello", "hey"].some((g) => lower.includes(g))) {
      botText = "Select a question below.";
    } else if (lower.includes("who is pradyush")) {
      botText = "I am Pradyush Mohapatra, a Computer Science Engineer passionate about AI, IoT, and Web Development.";
    } else if (lower.includes("projects")) {
      botText = "Projects include AI Sign Language Translator, Smart Home Automation, Pet Feeder, and more.";
    } else if (lower.includes("skills")) {
      botText = "I specialize in Python, Java, IoT, and Web Development.";
    } else if (lower.includes("education")) {
      botText = "I'm pursuing B.Tech in CSE at ITER, SOA University.";
    } else if (lower.includes("contacts")) {
      botText = "Reach me at pradyushmohapatra9@gmail.com or LinkedIn.";
    }

    setMessages((prev) => [...prev, userMsg, { type: "bot", text: botText }]);
    inputRef.current.value = "";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target) &&
        !event.target.closest(".chat-icon")
      ) {
        setChatVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <section className="hero">
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#tabs">Carrier</a></li>
          </ul>
        </nav>
        <div id="banner">
          <h1>
            Hi, I'm <span>Pradyush</span>
          </h1>
          <div className="typing-svg">
            <img
              src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=F0F7D6&center=true&vCenter=true&width=500&lines=%F0%9F%91%8B%2C+Welcome to my Portrfolio;Passionate+Computer+Science+Engineer;IoT+%7C+Machine+Learning+%7C+Web+Development"
              alt="Typing SVG"
              style={{ maxWidth: '100%', marginTop: '20px' }}
            />
          </div>
          <a href="#projects" className="btn">More Below ⬇</a>
          <a href="/pradyush.pdf" download className="download-cv">
            <span>Download CV </span>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="white" viewBox="0 0 24 24">
              <path d="M5 20h14v-2H5v2zm7-18v12.17l-4.88-4.88L6.7 11.7 12 17l5.3-5.3-1.42-1.41L13 14.17V2h-2z" />
            </svg>
          </a>
        </div>
      </section>

      <section id="about">
        <h2>About <span>Me</span></h2>
        <p>
          Hi, I'm Pradyush Mohapatra, a Computer Science Engineer with a passion for AI, web development, and embedded systems.
        </p>
        <p>
          My projects range from developing an AI-powered sign language translator to building an automated pet feeder using Raspberry Pi, showcasing my ability to integrate AI, IoT, and software development.
          On the web development side, I specialize in creating visually appealing, responsive websites with modern designs and interactive elements.
          I am deeply driven by curiosity and the thrill of solving real-world problems through technology. My journey has equipped me with a solid foundation in both hardware and software, allowing me to design systems that are not only functional but also user-centric.
          Whether it's writing clean and scalable code, designing intuitive user interfaces, or training machine learning models, I take pride in delivering solutions that make a difference. I also actively explore emerging technologies like edge computing and cloud integration to stay ahead of the curve.
          Outside of coding, I enjoy mentoring peers, collaborating on open-source projects, and continuously pushing my limits to learn and grow as an engineer and innovator.
        </p>
        <div className="tabs">
          {["skills", "experience", "education"].map((tab) => (
            <button
              key={tab}
              className={`tab-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {activeTab === "skills" && (
            <>
              <p><strong>Java:</strong> Backend logic and design</p>
              <p><strong>Python:</strong> ML & data tasks</p>
              <p><strong>HTML/CSS/JS:</strong> Responsive UI</p>
            </>
          )}
          {activeTab === "experience" && (
            <>
              <p><strong>Intern | OCAC Bhubaneswar </strong>- Worked on Java, JSP, DBMS</p>
            </>
          )}
          {activeTab === "education" && (
            <>
              <p><strong>B.Tech(CSE) - 2026</strong></p>
              <p>ITER, SOA University</p>
              <p><strong>CHSE +2 (PCM) - 2022</strong></p>
              <p>Elite Institute of Science and Application</p>
              <p><strong>10th - 2020</strong></p>
              <p>SSVM</p>
            </>
          )}
          {/* <CubeSection /> */}
          <PencilModel />
        </div>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <div className="project-container">
          {["AI Sign Language Translator", "Automated Pet Feeder", "E Teacher Searching", "Smart Home System", "Robotic Arm"].map((title, i) => (
            <div className="project-card" key={i}>
              <h3>{title}</h3>
              <p>{
                title === "AI Sign Language Translator" ? "Translates real-time sign language into text and speech using computer vision and ML." :
                title === "Automated Pet Feeder" ? "Dispenses pet food on a schedule via Raspberry Pi and app." :
                title === "E Teacher Searching" ? "Helps students find online tutors based on subject preferences." :
                title === "Smart Home System" ? "IoT-based system to control home devices using smartphones." :
                "Automated arm using Arduino and servo motors for pick-and-place tasks."
              }</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <h2>Contact <span>Me</span></h2>
        <h4>📞: +91 7205048743</h4>
        <div className="contact-container">
          <a href="mailto:pradyushmohapatra9@gmail.com">Gmail</a>
          <a href="https://github.com/pradyush-mohapatra">GitHub</a>
          <a href="https://linkedin.com/in/pradyush-mohapatra-3011b626a">LinkedIn</a>
          <a href="https://www.instagram.com/pradyushverse/?__pwa=1#">Instagram</a>
          <a href="https://t.me/pradyushofficial">Telegram</a>
        </div>
      </section>

      <button className="chat-icon" onClick={() => setChatVisible(!chatVisible)}>💬</button>

      {chatVisible && (
        <div className="chat-container" ref={chatRef}>
          <div className="chat-header">Chat with Me</div>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>{msg.text}</div>
            ))}
            <div className="quick-questions">
              {["Who is Pradyush?", "Projects", "Skills", "Education", "Contacts"].map((q, i) => (
                <button
                  key={i}
                  className="question-btn"
                  onClick={() => {
                    inputRef.current.value = q;
                    sendMessage();
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="chat-footer">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      <footer>&copy; 2025 Pradyush Mohapatra. All Rights Reserved.</footer>
    </div>
  );
}

export default App;