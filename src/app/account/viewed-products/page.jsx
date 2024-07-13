import React from "react";
import Header from "../../header/header";
import "../../../../public/css/cssAccount.css";
import ContentViewedProducts from "./contentViewedProducts";
const Account = () => {
  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentViewedProducts />
    </div>
  );
};

export default Account;
