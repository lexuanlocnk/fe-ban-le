import Header from "../../../header/header";
import { hostApi } from "../../../lib/config";
import DetailPromotionNews from "./detailPromotionNews";
import "../../../../../public/css/cssNews.css";
import Footer from "../../../../components/footer";

async function fetchNewsPromotionDetail(slug) {
  try {
    const response = await fetch(`${hostApi}/member/promotion/${slug} `, {
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

const HomePage = async ({ params }) => {
  const data = await fetchNewsPromotionDetail(params.detailNewsCategory);

  return (
    <div className="container-fluid px-0">
      <Header />
      <DetailPromotionNews data={data} />

      <Footer />
    </div>
  );
};

export default HomePage;
