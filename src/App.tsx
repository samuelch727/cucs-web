import React, { useRef, createContext, useState, useEffect } from "react";
import Nav from "./components/nav";
import HomePage from "./components/pages/HomePage";

export const ContentHeight = createContext(0);

function App() {
  const navRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setcontentHeight] = useState(0);
  useEffect(() => {
    function updateSize() {
      if (navRef && navRef.current) {
        setcontentHeight(
          window.innerHeight - navRef.current.getBoundingClientRect().height
        );
      }
    }
    if (!contentHeight) updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [navRef]);

  return (
    <div>
      <div ref={navRef}>
        <Nav />
      </div>
      <ContentHeight.Provider value={contentHeight}>
        <HomePage />
      </ContentHeight.Provider>
    </div>
  );
}

export default App;
