import BoxCardNewsHot from "./boxCardNewsHot";
import BoxCardNews from "./boxCardNews";
import TopNews from "./topNews";
import NewProductsNews from "./newProductsNews";
import NewsSale from "./newsSale";
import FormPromotionInformation from "./formPromotionInformation";
import ProductsInNews from "./productsInNews";
import { hostApi } from "../lib/config";
async function fetchNewsTopView() {
  try {
    const response = await fetch(`${hostApi}/member/news-by-views`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.listNews;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

async function fetchNewsSale() {
  try {
    const response = await fetch(`${hostApi}/member/promotion`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.list;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

async function fetchNewsCategory(category, pageValue) {
  try {
    const response = await fetch(
      `${hostApi}/member/news/${category}?page=${pageValue}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const ContentNews = async ({ categoryNews, page }) => {
  const apiNewsTop = fetchNewsTopView();
  const apiNewsSale = fetchNewsSale();
  const apiNewsCategory = fetchNewsCategory(categoryNews, page);

  const [dataNewsTop, dataNewsSale, dataNewsCategory] = await Promise.all([
    apiNewsTop,
    apiNewsSale,
    apiNewsCategory,
  ]);

  return (
    <div className="box-container-content-news">
      <div className="in-box-container-content-news pt-1">
        <div className="row box-content-news mx-0">
          <div className="col-12 col-lg-8 ps-lg-0 box_news_content_container">
            {dataNewsCategory && dataNewsCategory.listNew.length > 0 && (
              <BoxCardNewsHot dataNewsHot={dataNewsCategory?.listNew} />
            )}

            {dataNewsCategory && dataNewsCategory.listView.data.length > 0 && (
              <BoxCardNews dataNewsCategory={dataNewsCategory?.listView} />
            )}

            {/* <FormPromotionInformation />
            <ProductsInNews /> */}
          </div>
          <div className="col-12 col-lg-4 pe-lg-0 most_post_viewed_container">
            <TopNews dataNewsTop={dataNewsTop} />
            <NewProductsNews />
            <NewsSale dataNewsSale={dataNewsSale} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentNews;
