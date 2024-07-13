import Link from "next/link";

const TopNews = ({ dataNewsTop }) => {
  return (
    <div className="row mx-0 box-top-news bg-white mb-3  ">
      <div className="col-12 text_see_more px-0">
        <span>Xem nhiều nhất</span>
      </div>
      {dataNewsTop &&
        dataNewsTop.length > 0 &&
        dataNewsTop?.map((item, index) => (
          <div
            key={item.news_id}
            className="col-12 item_news   d-flex align-items-center"
          >
            <div
              style={{
                background:
                  index == 0 ? "#cb1c22" : index == 1 ? "#99a2aa" : "#ced4da",
              }}
              className="index_item"
            >
              <span>{index + 1}</span>
            </div>
            <Link href={`/news/${item.category_url}/${item.friendly_url}`}>
              <div className="text_item">
                <span>{item.title}</span>
                <div className="text_category_news_top">
                  <span className="title">Danh mục: </span>
                  <span className="value">{item.cat_name}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default TopNews;
