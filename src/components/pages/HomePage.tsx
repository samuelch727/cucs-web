import React, { createContext } from "react";
import Banner from "../banner";
import GridTable from "../gridTable";
import homePageData from "../../data/homePageData.json";

export const HomePageData = createContext(homePageData);

function HomePage() {
  return (
    <HomePageData.Provider value={homePageData}>
      <div style={{ backgroundColor: homePageData.backgroundColor }}>
        <Banner />
        <GridTable />
      </div>
    </HomePageData.Provider>
  );
}

export default HomePage;
