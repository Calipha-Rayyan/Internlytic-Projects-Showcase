import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <aside className="back-to-top-floating-container" aria-label="Page navigation">
      <button
        type="button"
        onClick={scrollToTop}
        className="back-to-top-4d-box btn-tactile"
        aria-label="Scroll back to top of the page"
        title="Back to Top"
      >
        {/* 4D dimensional specular depth layer */}
        <div className="btn-4d-inner" aria-hidden="true">
          <div className="btn-4d-glow" />
          <div className="btn-4d-arrow-wrap">
            <ArrowUp size={20} className="arrow-4d-icon" />
          </div>
          <span className="btn-4d-label">Top</span>
        </div>
      </button>
    </aside>
  );
}
