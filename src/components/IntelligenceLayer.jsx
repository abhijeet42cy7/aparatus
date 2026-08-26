import React, { useState, useEffect } from 'react';
import {
  HeaderCard,
  UniversalDocumentIngestion,
  MultiLanguageOCR,
  SmartDocumentClassification,
  AdvancedTableProcessing,
  HandwrittenTextRecognition,
  ContextAwareAI,
  NaturalLanguageQueries,
  AIPoweredAutomation
} from './intelligence-layer';

const INTELLIGENCE_LAYER_STYLES = `
  .intelligence-layer-container {
    min-height: 100vh;
    background-color: #000;
    color: #fff;
    padding:100px 95px 48px 95px;
  }

  .intelligence-features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .intelligence-carousel {
    display: none;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 450px;
  }

  .mobile-header-card {
    display: none;
  }

  .carousel-container {
    display: flex;
    transition: transform 0.3s ease;
    width: 100%;
    height: 100%;
  }

  .carousel-slide {
    min-width: 100%;
    width: 100%;
    height: 450px;
    flex-shrink: 0;
    display: flex;
    align-items: stretch;
  }

  .carousel-slide > * {
    width: 100% !important;
    height: 450px !important;
    min-height: 450px !important;
    max-height: 450px !important;
    box-sizing: border-box;
    display: flex !important;
    flex-direction: column !important;
  }

  .carousel-slide .intelligence-header-card,
  .carousel-slide .universal-document-ingestion-card,
  .carousel-slide .advanced-table-processing-card,
  .carousel-slide .multi-language-ocr-card,
  .carousel-slide .handwritten-text-recognition-card,
  .carousel-slide .smart-document-classification-card,
  .carousel-slide .context-aware-ai-card,
  .carousel-slide .natural-language-queries-card,
  .carousel-slide .ai-powered-automation-card {
    width: 100% !important;
    height: 450px !important;
    min-height: 450px !important;
    max-height: 450px !important;
    margin: 0 !important;
  }

  .carousel-slide svg {
    max-width: 100%;
    max-height: 200px;
    width: auto;
    height: auto;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
  }

  .carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .carousel-dot.active {
    background-color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 1200px) {
    .intelligence-container {
      flex-direction: column;
    }
    
    .header-section {
      width: 100%;
      max-width: 500px;
    }
    
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .intelligence-layer-container {
      padding: 50px 20px 24px 20px;
    }
    
    .intelligence-features-grid {
      display: none;
    }
    
    .mobile-header-card {
      display: block;
      margin-bottom: 30px;
    }
    
    .intelligence-carousel {
      display: block;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
 
`;

export default function IntelligenceLayer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const cards = [
    <UniversalDocumentIngestion key="universal" />,
    <AdvancedTableProcessing key="table" />,
    <MultiLanguageOCR key="ocr" />,
    <HandwrittenTextRecognition key="handwritten" />,
    <SmartDocumentClassification key="classification" />,
    <ContextAwareAI key="context" />,
    <NaturalLanguageQueries key="queries" />,
    <AIPoweredAutomation key="automation" />
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-slide every 2 seconds on mobile
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % cards.length);
    }, 2000);
    return () => clearInterval(id);
  }, [isMobile, cards.length]);

  // Touch handlers for swipe functionality
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="intelligence-layer-container">
      <style>{INTELLIGENCE_LAYER_STYLES}</style>
      
      {/* Desktop Grid View */}
      <div className="intelligence-features-grid">
        <HeaderCard />
        <UniversalDocumentIngestion />
        <AdvancedTableProcessing />
        <MultiLanguageOCR />
        <HandwrittenTextRecognition />
        <SmartDocumentClassification />
        <ContextAwareAI />
        <NaturalLanguageQueries />
        <AIPoweredAutomation />
      </div>

      {/* Mobile Header Card - Only visible on mobile */}
      <div className="mobile-header-card">
        <HeaderCard />
      </div>

      {/* Mobile Carousel View */}
      <div 
        className="intelligence-carousel"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="carousel-container"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`
          }}
        >
          {cards.map((card, index) => (
            <div key={index} className="carousel-slide">
              {card}
            </div>
          ))}
        </div>
        
        {/* Carousel Navigation Dots */}
        <div className="carousel-dots">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}