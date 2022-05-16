import React, { useEffect } from "react";
import "./main.css";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div className="Main">
        <b>Main page</b>
      </div>
      <footer className="footer">
        <p>
          <span>FOOTER</span>
          <br />
          <span>웹사이트명 : CrimeMap</span>
          <br />
          <span>이용약관</span>
          <br />
          <span>Copyright 2022. crimemap. All Rights Reserved.</span>
        </p>
      </footer>
    </div>
  );
};

export default Main;
