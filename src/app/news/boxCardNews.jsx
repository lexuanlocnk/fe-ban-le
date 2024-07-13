import CardNews from "./cardNews";
import ComponentPagination from "../../components/componentPagination";

const BoxCardNews = ({ dataNewsCategory }) => {
  return (
    <div className="row mx-0 box_all_post_news bg-white mb-3">
      <div className="col-12">
        {dataNewsCategory &&
          dataNewsCategory?.data?.length > 0 &&
          dataNewsCategory?.data?.map((item, index) => (
            <CardNews item={item} key={item.news_id} />
          ))}
      </div>

      {dataNewsCategory && dataNewsCategory.total > 15 && (
        <div className="col-12">
          <ComponentPagination pageSize={15} data={dataNewsCategory} />
        </div>
      )}
    </div>
  );
};

export default BoxCardNews;
