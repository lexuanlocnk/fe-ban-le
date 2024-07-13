import Header from "../header/header";
import Login from "./login";
import Footer from "../../components/footer";
import "../../../public/css/cssLogin.css";

export default async function Page({}) {
  return (
    <div className="container-fluid px-0">
      <Header />
      <Login />
      <Footer />
    </div>
  );
}
