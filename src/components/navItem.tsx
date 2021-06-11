import React, { useRef, useEffect } from "react";
import "./navItem.sass";

interface passInData {
  content: string;
  handleMouseOver: any;
  handleMouseClick: any;
  initIndicator: any;
  handleMouseLeave: any;
}

function NavItem({
  content,
  handleMouseOver,
  handleMouseClick,
  handleMouseLeave,
  initIndicator,
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
    <div
      className="navItem"
      ref={divRef}
      onMouseEnter={handleOver}
      onClick={handleClick}
      onMouseLeave={() => handleMouseLeave()}
    >
      {content}
    </div>
  );
}

export default NavItem;
