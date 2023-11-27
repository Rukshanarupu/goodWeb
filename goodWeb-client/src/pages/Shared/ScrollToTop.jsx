import React, { useState, useEffect } from 'react';
import {FaAngleDoubleUp} from "react-icons/fa"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className='d-flex justify-content-center align-items-center'>
          <button onClick={scrollToTop}
          className="btn btn-dark position-fixed btn-scroll-to-top">
            <FaAngleDoubleUp className="text-white"/>
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
