import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import "./Body.css"

function Body() {
  return (
    <div className="body">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Body;