// CubeSection.js
import React, { useRef, useEffect } from 'react';
import './CubeSection.css';

const CubeSection = () => {
  const cubeRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      const rotateX = y * 80;
      const rotateY = x * 80;
      cubeRef.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="cube-scene">
      <div className="cube" ref={cubeRef}>
        <div className="face front">Skills<br/>Java, Python</div>
        <div className="face back">Experience<br/>Intern at OCAC</div>
        <div className="face right">Education<br/>ITER, CHSE</div>
        <div className="face left">Projects<br/>AI, IoT</div>
        <div className="face top">About<br/>CS Engineer</div>
        <div className="face bottom">Contact<br/>Gmail, LinkedIn</div>
      </div>
    </div>
  );
};

export default CubeSection;
