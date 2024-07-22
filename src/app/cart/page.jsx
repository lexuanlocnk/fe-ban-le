import Header from "../header/header";
import Footer from "../../components/footer";
import ContentCart from "./contentCart";
import "../../../public/css/cssCart.css";
export default function Page({}) {
  return (
    <div className="container-fluid px-0 container_cart">
      <Header />
      <ContentCart />
      <Footer />
    </div>
  );
}
