import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { useSpring, animated } from "react-spring";
import { MediaData } from "../App";
import { Link } from "react-router-dom";
import "./nav.sass";
import NavItem from "./navItem";
import navData from "../data/navData.json";
import themeData from "../data/themeData.json";
import { ReactComponent as MenuIcon } from "../menu.svg";
import { ReactComponent as CloseIcon } from "../close.svg";

interface passInData {
  setNoScroll: Function;
}

function Nav({ setNoScroll }: passInData) {
  //@ts-ignore
  const { isMobile } = useContext(MediaData); //ignore due to ts limitation
  return isMobile ? <NavMobile setNoScroll={setNoScroll} /> : <NavDesktop />;
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

  const location = useLocation().pathname;

  return (
    <section
      style={{
        backgroundColor: themeData.homePage.background ?? "#ffffff",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: 3,
      }}
    >
      <nav>
        <div className="navDiv">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row">
              <img src={navData.navIconDir} className="icon" />
              <div
                dangerouslySetInnerHTML={{ __html: navData.navTitle }}
                style={{ color: themeData.homePage.primary ?? "#000000" }}
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
                      location === contaxt.nav
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

function NavMobile({ setNoScroll }: passInData) {
  const [showMenu, setShowMenu] = useState(false);
  const [navHeight, setNavHeight] = useState("0px");
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation().pathname;

  const handleClick = () => {
    setNoScroll();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (navRef && navRef?.current) {
      setNavHeight(
        navRef.current.getBoundingClientRect().height.toString() + "px"
      );
    }
  }, [navRef]);

  return (
    <section
      style={{
        backgroundColor: themeData.homePage.background ?? "#ffffff",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: 3,
      }}
    >
      {showMenu ? (
        <div
          style={{
            width: window.innerWidth + "px",
            height: window.innerHeight + "px",
            backgroundColor: themeData.homePage.background ?? "#ffffff",
            position: "absolute",
            zIndex: 2,
          }}
        >
          <div
            style={{
              top: "0",
              right: "0",
              position: "absolute",
              height: navHeight,
              // height: "100%",
              // height: "50px",
              display: "grid",
              placeItems: "center",
              marginRight: "10px",
            }}
            onClick={() => handleClick()}
          >
            <div style={{ display: "table-cell", verticalAlign: "middle" }}>
              <CloseIcon
                style={{
                  height: "30px",
                  width: "30px",
                  fill: themeData.homePage.primary ?? "#000000",
                  display: "block",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <div
              style={{
                maxHeight: "90vh",
                display: "flex",
                flexFlow: "column wrap",
              }}
            >
              {navData.navItem.map((context, key) => {
                return (
                  <div
                    key={key}
                    style={{
                      fontSize: "30px",
                      textAlign: "center",
                      margin: "5px",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "auto",
                        marginRight: "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Link
                        to={context.nav}
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          setTimeout(() => {
                            handleClick();
                          }, 250);
                        }}
                      >
                        <p
                          style={
                            location == context.nav
                              ? {
                                  borderBottom:
                                    "4px solid " +
                                    themeData.homePage.primaryVariant,
                                  color: themeData.homePage.primary,
                                }
                              : {
                                  borderBottom: "4px solid transparent",
                                  color: themeData.homePage.primary,
                                }
                          }
                        >
                          {context.title}
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
      <nav>
        <div className="navDiv" ref={navRef}>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row" style={{ marginLeft: "10px" }}>
              <img src={navData.navIconDir} className="icon" />
              <div
                dangerouslySetInnerHTML={{ __html: navData.navTitle }}
                style={{ color: themeData.homePage.primary ?? "#ffffff" }}
                className="d-flex socName"
              />
            </div>
            <div className="menuIcon" style={{ position: "relative" }}>
              <div
                style={{ height: "100%", width: "100%", position: "absolute" }}
                onClick={() => handleClick()}
              />
              <MenuIcon
                fill={themeData.homePage.primary}
                style={{
                  marginRight: "10px",
                  display: "block",
                  height: "30px",
                  width: "30px",
                }}
                onClick={() => handleClick}
              />
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Nav;
