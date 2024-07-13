import Header from "../../header/header";
import DetailNews from "./detailNews";
import { hostApi } from "../../lib/config";
import "../../../../public/css/cssNews.css";
import Footer from "../../../components/footer";

async function fetchNewsDetail(slug) {
  const { slugDetailNews } = slug;

  try {
    const response = await fetch(
      `${hostApi}/member/news-detail/${slugDetailNews[0]}/${slugDetailNews[1]}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

async function fetchNewsRelated(slug) {
  const { slugDetailNews } = slug;

  try {
    const response = await fetch(
      `${hostApi}/member/related-new/${slugDetailNews[0]}/${slugDetailNews[1]}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.relatedNew;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const HomePage = async ({ params }) => {
  const apiNewsDetail = fetchNewsDetail(params);
  const apiRelatedNews = fetchNewsRelated(params);

  const [dataNewsDetail, dataRelatedNews] = await Promise.all([
    apiNewsDetail,
    apiRelatedNews,
  ]);

  return (
    <div className="container-fluid px-0">
      <Header />
      <DetailNews
        dataRelatedNews={dataRelatedNews}
        dataNewsDetail={dataNewsDetail}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
