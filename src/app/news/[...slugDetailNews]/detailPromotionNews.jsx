import Breadcrumb from "../../../components/breadcrumb";

const DetailPromotionNews = ({ data }) => {
  return (
    <div className="box-container-category-news">
      <div className="in-box-container-category-news pt-2">
        <div className="row box-content-category-news mx-0">
          <div className="col-12   mb-2 box_content_detail_news">
            <Breadcrumb
              nameFirstItem={{
                link: "/news/tin-khuyen-mai",
                label: "Tin khuyến mãi",
              }}
              nameItem={data?.title}
            />
          </div>
          <div className="col-12 px-0 mb-2">
            <div className="box_content_detail_news">
              <div className="container_content_news mb-3">
                <div className="box_title_news">
                  <span>{data?.title}</span>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.description,
                  }}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPromotionNews;
