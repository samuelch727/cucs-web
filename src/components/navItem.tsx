import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navItem.sass";

interface passInData {
  content: string;
  handleMouseOver: any;
  handleMouseClick: any;
  initIndicator: any;
  handleMouseLeave: any;
  color: string;
  link: string;
}

function NavItem({
  content,
  handleMouseOver,
  handleMouseClick,
  handleMouseLeave,
  initIndicator,
  color,
  link,
}: passInData) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleOver = (e: any) => {
    handleMouseOver(
      divRef?.current?.getBoundingClientRect().x,
      divRef?.current?.getBoundingClientRect().width
    );
  };

  const handleClick = (e: any) => {
    handleMouseClick(
      divRef?.current?.getBoundingClientRect().x,
      divRef?.current?.getBoundingClientRect().width
    );
  };

  var isInit = false;

  useEffect(() => {
    if (divRef && !isInit) {
      isInit = true;
      initIndicator(
        divRef?.current?.getBoundingClientRect().x,
        divRef?.current?.getBoundingClientRect().width
      );
    }
  }, [divRef]);

  return (
    <div ref={divRef} className="navItem">
      <Link
        onMouseEnter={handleOver}
        onClick={handleClick}
        onMouseLeave={() => handleMouseLeave()}
        style={{ color, textDecoration: "none", padding: "10px" }}
        to={link}
      >
        {content}
      </Link>
    </div>
  );
}

export default NavItem;
