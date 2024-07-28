import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// Create a context
const WindowWidthContext = createContext();

// Create a provider component
export const WindowWidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isSmallerDevice = windowWidth < 500; // Example breakpoint for smaller devices

  return (
    <WindowWidthContext.Provider value={{ windowWidth, isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

WindowWidthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the WindowWidthContext
export const useWindowWidth = () => {
  return useContext(WindowWidthContext);
};
