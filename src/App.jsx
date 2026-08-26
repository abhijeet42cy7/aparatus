import React, { useLayoutEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Opening from './components/Opening.jsx'
import IntelligenceLayer from './components/IntelligenceLayer.jsx'
import SolutionsByIndustry from './components/SolutionsByIndustry.jsx'
import WhyChooseAOCR from './components/WhyChooseAOCR.jsx'
import RequestAccess from './components/RequestAccess.jsx'
import RequestAccessForm from './components/RequestAccessForm.jsx'
import Footer from './components/Footer.jsx'
import Pipeline from './components/Pipeline.jsx'
import AnimatedFAQDiagram from './components/FAQ_backup.jsx'
import Chatbot from './components/Chatbot.jsx'
import FAQ from './components/FAQ.jsx'
import { initializeLenisScroll } from './utils/smoothScroll.js'
/**
 * Main App Component
 * Clean blank screen ready for development
 */
function App() {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log('handleOpenModal called, setting modal to true');
    setIsModalOpen(true);
  };

  console.log('App component rendered, handleOpenModal:', handleOpenModal);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useLayoutEffect(() => {
    initializeLenisScroll();
  }, []);

  // Error boundary for the entire app
  if (hasError) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was an error loading the application.</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Reload Page
        </button>
        {error && (
          <details style={{ marginTop: '20px', textAlign: 'left' }}>
            <summary>Error Details</summary>
            <pre style={{
              background: '#f8f9fa',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              {error.toString()}
            </pre>
          </details>
        )}
      </div>
    );
  }

  try {
    return (
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar onRequestAccess={handleOpenModal} />
              <Hero onRequestAccess={handleOpenModal} />
              <Opening />
              <IntelligenceLayer />
              <SolutionsByIndustry />
              <Pipeline />
              <WhyChooseAOCR />
              <AnimatedFAQDiagram />
              {window.innerWidth < 768 && <FAQ />}
              <Chatbot />
              <RequestAccess onRequestAccess={handleOpenModal} />
              <Footer />
              <RequestAccessForm 
                isModal={isModalOpen} 
                onClose={handleCloseModal}
                onRequestAccess={handleOpenModal}
              />
            </>
          } />
        </Routes>
      </Router>
    )
  } catch (error) {
    console.error('App error:', error);
    setError(error);
    setHasError(true);
    return null;
  }
}

export default App 