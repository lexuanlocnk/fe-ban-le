import "../../../public/css/cssNews.css";
import Header from "../header/header";
import CategoryNews from "./categoryNews";
import ContentNews from "./contentNews";
import Footer from "../../components/footer";
import { hostApi } from "../lib/config";

async function fetchNewsCategory() {
  try {
    const response = await fetch(`${hostApi}/member/news-category`, {
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

const HomePage = async ({ searchParams }) => {
  const dataCategory = await fetchNewsCategory();
  const categoryNews = searchParams["categoryNews"] ?? "tin-cong-nghe";
  const page = searchParams["page"] ?? 1;

  return (
    <div className="container-fluid px-0">
      <Header />
      <CategoryNews categoryNews={categoryNews} dataCategory={dataCategory} />
      <ContentNews page={page} categoryNews={categoryNews} />
      <Footer />
    </div>
  );
};

export default HomePage;
