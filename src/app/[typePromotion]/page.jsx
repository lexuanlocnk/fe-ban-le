import "../../../public/css/cssTypePromotion.css";
import Footer from "../../components/footer";
import Header from "../header/header";
import ContentPromotionType from "./contentPromotionType";
export default async function Page({ params }) {
  return (
    <div className="container-fluid px-0 container_cart">
      <Header />
      <ContentPromotionType typePromotion={params?.typePromotion} />
      <Footer />
    </div>
  );
}
