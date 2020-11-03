import React from "react";
import HomeInfo from "../HomeInfo/HomeInfo";
import HomeMain from "../HomeMain/HomeMain";

import "./Home.scss";

export default function Home(props) {
  return (
    <div className="home">
      <div className="container">
        <HomeMain props={props} />
        <HomeInfo />
      </div>
    </div>
  );
}
