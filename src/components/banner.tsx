import React, { useContext } from "react";
import { ContentHeight } from "../App";
import "./banner.sass";
import data from "../data/homePageData.json";

function Banner() {
  const height = useContext(ContentHeight);
  var titleStyle = {};
  var subTitleStyle = {};
  var textBoxStyle = {};
  var imgStyle = {};
  if (data.banner.hasOwnProperty("titleStyle"))
    //@ts-ignore
    titleStyle = JSON.parse(data.banner.titleStyle);
  if (data.banner.hasOwnProperty("subTitleStyle"))
    //@ts-ignore
    subTitleStyle = JSON.parse(data.banner.subTitleStyle);
  if (data.banner.hasOwnProperty("textBoxStyle"))
    //@ts-ignore
    textBoxStyle = JSON.parse(data.banner.textBoxStyle);
  if (data.banner.hasOwnProperty("imgStyle"))
    //@ts-ignore
    imgStyle = JSON.parse(data.banner.imgStyle);

  return (
    <div
      style={{
        height,
        backgroundColor: "#261A1A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img src="./img/OCampBanner.jpg" style={imgStyle} className="bannerImg" />
      <div className="d-flex bannerTextBox" style={textBoxStyle}>
        <div>
          {data.banner.hasOwnProperty("title") ? (
            <p
              style={titleStyle}
              dangerouslySetInnerHTML={{ __html: data.banner.title }}
            />
          ) : null}
          {data.banner.hasOwnProperty("subTitle") ? (
            <p
              style={subTitleStyle}
              dangerouslySetInnerHTML={{ __html: data.banner.subTitle }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Banner;
