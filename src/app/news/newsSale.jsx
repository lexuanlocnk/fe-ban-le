import Image from "next/image";
import { hostImage } from "../lib/config";

const NewsSale = ({ dataNewsSale }) => {
  return (
    <div className="row mx-0 box-top-news bg-white mb-3  ">
      <div className="col-12 text_see_more px-0">
        <span>Tin khuyến mãi</span>
      </div>
      {dataNewsSale &&
        dataNewsSale?.length > 0 &&
        dataNewsSale?.map((item, index) => (
          <div
            key={item.promotion_desc.promotion_id}
            className="col-12  px-0 px-md-2 my-2 col-xl-12 col-lg-12 col-md-6"
          >
            <div className="row item_news_sale position-relative mx-0">
              <div className="col-12 px-0">
                <div className="box_img_news_sale image custom-img-sale-news ">
                  <Image
                    src={hostImage + item.picture}
                    alt={item.promotion_desc.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-100 h-100 img_hover_news_common"
                  />
                </div>
              </div>
              <div className="col-12 box_title_sale">
                <span>{item.promotion_desc.title}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NewsSale;
