import React from "react";
import Header from "../header/header";
import Footer from "../../components/footer";

import "../../../public/css/cssAccount.css";
import ContentAccount from "./contentAccount";
const Account = () => {
  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentAccount />
      <Footer />
    </div>
  );
};

export default Account;
