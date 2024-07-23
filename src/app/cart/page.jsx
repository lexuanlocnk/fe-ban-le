import Header from "../header/header";
import Footer from "../../components/footer";
import ContentCart from "./contentCart";
import "../../../public/css/cssCart.css";
import { hostApi } from "../lib/config";

async function fetchDataMethodShipping() {
  try {
    const response = await fetch(`${hostApi}/member/show-shipping-method`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}
export default async function Page({}) {
  const dataMethodShipping = await fetchDataMethodShipping();

  return (
    <div className="container-fluid px-0 container_cart">
      <Header />
      <ContentCart dataMethodShipping={dataMethodShipping} />
      <Footer />
    </div>
  );
}
