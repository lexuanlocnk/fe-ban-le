import BannerHomePage from "./bannerHomePage";
import ProductsFlashSale from "./productFlashSale";
import Slider3dHotProducts from "./slider3dHotProducts";
import HotProducts from "./hotProducts";
import SecondaryBanner from "./secondaryBanner";
import FeaturedProductsCategory from "./featuredProductsCategory";
import BoxModalCompare from "./boxModalCompare";
import TopProducts from "./topProducts";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/nextAuth";
import { hostApi } from "./lib/config";

async function fetchDataCategory() {
  try {
    const response = await fetch(`${hostApi}/member/category-parent`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const ContentHomePage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  const dataCategory = await fetchDataCategory();

  const page = searchParams["page"] ?? "1";
  const category = searchParams["category"] ?? "laptop";

  return (
    <div className="box-container-content-homepage">
      <div className="row container-content-homepage">
        <div className="col-12 box_container_banner   mt-2">
          <div className="container_banner bg-white">
            <BannerHomePage dataCategory={dataCategory} />
          </div>
        </div>
        <div className="col-12 box_container_slider_product my-2">
          <div className=" bg-white  box-slider-product ">
            <TopProducts session={session} />

            {/* <Slider3dHotProducts session={session} /> */}
          </div>
        </div>
        <div className="col-12 box_container_flash_sale_bg mb-2">
          <div className="flash-sale-bg  bg-white py-2">
            <ProductsFlashSale />
            {/* err */}
          </div>
        </div>
        <div className="col-12  box_container_secondary_banner mb-2">
          <div className="secondary_banner  bg-white py-2">
            <SecondaryBanner />
          </div>
        </div>

        <div className="col-12  box_container_hot_category mb-2">
          <div className="hot_category  bg-white py-2">
            <FeaturedProductsCategory
              dataCategory={dataCategory}
              session={session}
              category={category}
            />
          </div>
        </div>
        <div className="col-12  box_container_hot_products mb-2">
          <div className="hot-products  bg-white py-2">
            <HotProducts page={page} session={session} />
          </div>
        </div>
      </div>
      <BoxModalCompare session={session} />
    </div>
  );
};
export default ContentHomePage;
