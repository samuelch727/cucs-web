import React, { createContext } from "react";
import Banner from "../banner";
import GridTable from "../gridTable";
import Footer from "../footer";
import homePageData from "../../data/homePageData.json";

export const HomePageData = createContext(homePageData);

function HomePage() {
  return (
    <HomePageData.Provider value={homePageData}>
      <div style={{ backgroundColor: homePageData.color.background }}>
        <Banner />
        <GridTable />
        <Footer />
      </div>
    </HomePageData.Provider>
  );
}

export default HomePage;
