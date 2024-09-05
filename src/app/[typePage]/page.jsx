import "../../../public/css/cssTypePromotion.css";
import Footer from "../../components/footer";
import Header from "../header/header";
import ContentPromotionType from "./promotionType/contentPromotionType";
import ContentPageService from "./pageFooter/contentPageService";
export default function Page({ params, searchParams }) {
  const type = ["hot-products", "flash-sale"];

  const isValidTypePromotion = type.includes(params?.typePage);

  return (
    <div className="container-fluid px-0 container_cart">
      <Header />
      {isValidTypePromotion ? (
        // Nếu hợp lệ, hiển thị component ContentPromotionType
        <ContentPromotionType typePromotion={params?.typePage} />
      ) : (
        // Nếu không hợp lệ, có thể hiển thị thông báo hoặc một phần tử rỗng
        <ContentPageService page={searchParams?.page ?? 1} />
      )}

      <Footer />
    </div>
  );
}
