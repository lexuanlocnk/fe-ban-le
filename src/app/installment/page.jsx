import Header from "../header/header";
import Footer from "../../components/footer";
import "../../../public/css/cssInstallment.css";
import ContentInstallment from "./contentInstallment";
export default function Page({}) {
  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentInstallment />
      <Footer />
    </div>
  );
}
