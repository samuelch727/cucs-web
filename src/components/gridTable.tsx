import { relative } from "path";
import React, { useContext } from "react";
import { HomePageData } from "./pages/HomePage";
import { MediaData } from "../App";

function GridTable() {
  const data = useContext(HomePageData);
  const { isMobile } = useContext(MediaData);

  return (
    <div
      style={{
        backgroundColor: data.color.background,
        margin: "auto",
      }}
    >
      <div
        className="row"
        style={{
          padding: "5px",
          backgroundColor: data.color.background,
          margin: "0",
        }}
      >
        {data.gridData.map((context, key) => {
          return (
            <div
              className={isMobile ? "col-12" : "col-" + context.span}
              style={{ padding: "5px" }}
              key={key}
            >
              <div
                style={{
                  backgroundColor: context.backgroundColor,
                  minHeight: context.height,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    msTransform: "translateY(-50%)",
                    transform: "translateY(-50%)",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      color: context.subTitleColor,
                      fontSize: context.subTitleFontSize,
                      padding: "10px 10px 0px 10px",
                      //@ts-ignore
                      textAlign: context.subTitleAlignment,
                    }}
                  >
                    {context.subTitle}
                  </div>
                  <div
                    style={{
                      color: context.titleColor,
                      fontSize: context.titleFontSize,
                      padding: "0px 10px 10px 10px",
                      //@ts-ignore
                      textAlign: context.titleAlignment,
                    }}
                    dangerouslySetInnerHTML={{ __html: context.title }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GridTable;
