import React from "react";
import Header from "../../header/header";
import "../../../../public/css/cssAccount.css";
import ContentOrderManagement from "./contentOrderManagement";
const page = () => {
  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentOrderManagement />
    </div>
  );
};

export default page;
