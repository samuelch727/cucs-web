import React, { useContext } from "react";
import { HomePageData } from "./pages/HomePage";
import { ReactComponent as IGLogo } from "../instagram.svg";

function Footer() {
  const data = useContext(HomePageData);
  return (
    <div className="d-flex justify-content-between">
      <div
        style={{ color: data.color.primary, padding: "10px", fontSize: "16px" }}
        className="d-flex"
      >
        © 2020-2021 香港中文大學學生會計算機科學系會 版權所有
      </div>
      <div
        style={{
          color: data.color.primary,
          padding: "10px",
        }}
        className="d-flex"
      >
        <IGLogo
          fill={data.color.primary}
          style={{ marginTop: "auto", marginBottom: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}

export default Footer;
