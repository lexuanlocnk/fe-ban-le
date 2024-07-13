import Image from "next/image";
import { FieldTimeOutlined } from "@ant-design/icons";
import { hostImage } from "../lib/config";
import { calculateTimeDifference } from "../lib/functions";
import Link from "next/link";
const BoxCardNewsHot = ({ dataNewsHot }) => {
  return (
    <div className="row mx-0 mb-3">
      <div className="col-12">
        <div className="row box_all_item_hot_news bg-white ">
          <div className="col-md-7 px-1 col-12 mb-1 mb-md-0">
            <Link
              href={`/news/${dataNewsHot[0]?.url_cat}/${dataNewsHot[0]?.friendly_url}`}
            >
              <div className="h-100 box_first_news_hot row mx-0">
                <div className="col-12 is-2by2-custom image overflow-hidden box_image_first_news_hot">
                  <Image
                    quality={100}
                    height={0}
                    width={0}
                    sizes="100vw"
                    src={hostImage + dataNewsHot[0]?.picture}
                    className="w-100 h-100 img_hover_news_common"
                    alt="banner-image"
                  />
                </div>
                <div className="col-12 text-title_hot_news_first px-0 pt-1">
                  <span>{dataNewsHot[0]?.title}</span>
                </div>
                <div className="col-12 text-update_hot_news_firsh px-0">
                  <FieldTimeOutlined />{" "}
                  <span>
                    {" "}
                    {calculateTimeDifference(dataNewsHot[0]?.date_post)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-5 px-md-1 px-0 col-12">
            <div className="row mx-0 mb-2">
              {dataNewsHot &&
                dataNewsHot?.length > 0 &&
                dataNewsHot?.slice(1).map((item, index) => (
                  <Link
                    key={item.news_id}
                    href={`/news/${item?.url_cat}/${item?.friendly_url}`}
                  >
                    <div className="col-md-12 col-6 mb-2 px-md-1 px-1">
                      <div className="row mx-0">
                        <div className="col-md-5 col-12 box_second_news_hot px-0">
                          <div className="box_item_news_second custom-img-news-hot image overflow-hidden">
                            <Image
                              quality={100}
                              height={0}
                              width={0}
                              sizes="100vw"
                              src={hostImage + item.picture}
                              className="w-100 h-100 img_hover_news_common"
                              alt="banner-image"
                            />
                          </div>
                        </div>
                        <div className="col-md-7 col-12 px-2">
                          <div className="col-12 text-title_hot_news_second">
                            <span>{item.title}</span>
                          </div>
                          <div className="col-12 text-update_hot_news_second d-flex align-items-center">
                            <FieldTimeOutlined />
                            <span className="ms-1">
                              {calculateTimeDifference(item.date_post)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxCardNewsHot;
