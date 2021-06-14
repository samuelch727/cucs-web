import React, { useRef, createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/nav";
import HomePage from "./components/pages/HomePage";

export const MediaData = createContext({
  contentHeight: 0,
  isMobile: true,
});

function App() {
  const navRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setcontentHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    function updateSize() {
      setIsMobile(window.outerWidth < 798 ? true : false);
      if (navRef && navRef.current) {
        setcontentHeight(
          window.innerHeight - navRef.current.getBoundingClientRect().height
        );
      }
    }
    setIsMobile(window.outerWidth < 798 ? true : false);
    if (!contentHeight) updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div>
      <Router>
        <MediaData.Provider value={{ contentHeight, isMobile }}>
          <div ref={navRef}>
            <Nav />
          </div>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
        </MediaData.Provider>
      </Router>
    </div>
  );
}

export default App;
