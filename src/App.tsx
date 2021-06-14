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
  const [mobileShowMenu, setMobileShowMenu] = useState(false);
  useEffect(() => {
    function updateSize() {
      setIsMobile(window.outerWidth < 798 ? true : false);
      if (window.outerWidth >= 798) {
        setMobileShowMenu(false);
      }
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
  }, [contentHeight]);

  return (
    <div
      style={
        mobileShowMenu
          ? {
              overflow: "hidden",
              height: window.innerHeight,
              width: window.innerWidth,
            }
          : {}
      }
    >
      <Router>
        <MediaData.Provider value={{ contentHeight, isMobile }}>
          <div ref={navRef}>
            <Nav
              setNoScroll={() => {
                setMobileShowMenu(!mobileShowMenu);
              }}
            />
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
