import React, { useState, useRef, useContext } from "react";
import { useSpring, animated } from "react-spring";
import { MediaData } from "../App";
import "./nav.sass";
import NavItem from "./navItem";
import navData from "../data/navData.json";
import themeData from "../data/themeData.json";
import { ReactComponent as MenuIcon } from "../menu.svg";

function Nav() {
  //@ts-ignore
  const { isMobile } = useContext(MediaData); //ignore due to ts limitation
  return isMobile ? <NavMobile /> : <NavDesktop />;
}

function NavDesktop() {
  const navControlRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = (x: number, width: number) => {
    var left = 0;
    if (navControlRef && navControlRef.current) {
      left = x - navControlRef?.current?.getBoundingClientRect().x;
    }
    setIndicatorProp({
      ...indicatorPro,
      width: (width - 20).toString() + "px",
      left: (left + 10).toString() + "px",
    });
  };

  const handleMouseClick = () => {
    setIndicatorProp({
      ...indicatorPro,
      initWidth: indicatorPro.width,
      initLeft: indicatorPro.left,
    });
  };

  const handleMouseLeave = () => {
    setIndicatorProp({
      ...indicatorPro,
      width: indicatorPro.initWidth,
      left: indicatorPro.initLeft,
    });
  };

  const initIndicatorPosition = (x: number, width: number) => {
    var left = 0;
    if (navControlRef && navControlRef.current) {
      left = x - navControlRef?.current?.getBoundingClientRect().x;
    }
    setIndicatorProp({
      width: (width - 20).toString() + "px",
      left: (left + 10).toString() + "px",
      initWidth: (width - 20).toString() + "px",
      initLeft: (left + 10).toString() + "px",
    });
  };

  const [indicatorPro, setIndicatorProp] = useState({
    width: "0px",
    left: "0px",
    initWidth: "0",
    initLeft: "0",
  });

  const indicatorStyle = useSpring({
    position: "absolute",
    left: indicatorPro.left,
    width: indicatorPro.width,
    height: "4px",
    backgroundColor: "orange",
    bottom: "-5px",
    config: { mass: 1, tension: 140, friction: 18 },
  });

  return (
    <section
      style={{
        backgroundColor: themeData.homePage.background ?? "#ffffff",
      }}
    >
      <nav>
        <div className="navDiv">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row">
              <img src={navData.navIconDir} className="icon" />
              <div
                dangerouslySetInnerHTML={{ __html: navData.navTitle }}
                style={{ color: themeData.homePage.primary ?? "#ffffff" }}
                className="d-flex socName"
              />
            </div>
            <div className="d-flex flex-row navBox" ref={navControlRef}>
              {navData.navItem.map((contaxt, index) => {
                return (
                  <NavItem
                    color={themeData.homePage.primary ?? "#000000"}
                    key={index}
                    content={contaxt.title}
                    handleMouseOver={handleMouseOver}
                    handleMouseClick={handleMouseClick}
                    initIndicator={
                      index === navData.defaultItem
                        ? initIndicatorPosition
                        : () => {}
                    }
                    handleMouseLeave={handleMouseLeave}
                    link={contaxt.nav}
                  />
                );
              })}
              <animated.div
                //@ts-ignore
                style={indicatorStyle}
              />
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

function NavMobile() {
  return (
    <section
      style={{
        backgroundColor: themeData.homePage.background ?? "#ffffff",
      }}
    >
      <nav>
        <div className="navDiv">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row" style={{ marginLeft: "10px" }}>
              <img src={navData.navIconDir} className="icon" />
              <div
                dangerouslySetInnerHTML={{ __html: navData.navTitle }}
                style={{ color: themeData.homePage.primary ?? "#ffffff" }}
                className="d-flex socName"
              />
            </div>
            <div className="menuIcon">
              <MenuIcon
                fill={themeData.homePage.primary}
                style={{ marginRight: "10px", display: "block" }}
              />
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Nav;
