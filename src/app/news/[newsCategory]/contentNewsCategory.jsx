import Breadcrumb from "../../../components/breadcrumb";
import ComponentBannerTwoImage from "../../../components/componentBannerTwoImage";
import MainContentNewsCategory from "./mainContentNewsCategory";
const ContentCategoryNews = ({ page }) => {
  return (
    <div className="box-container-content-category-news mb-3">
      <div className="in-box-container-content-category-news pt-2">
        <div className="row box-content-category-news mx-0">
          <div className="col-12 ">
            <Breadcrumb
              nameFirstItem={{
                link: "/news",
                label: "Tin tức",
              }}
              nameItem={"Tin khuyến mãi"}
            />
          </div>

          <ComponentBannerTwoImage />
          <MainContentNewsCategory page={page} />
        </div>
      </div>
    </div>
  );
};

export default ContentCategoryNews;
