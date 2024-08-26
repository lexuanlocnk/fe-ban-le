import Image from "next/image";
import Breadcrumb from "../../../components/breadcrumb";
import { hostImage } from "../../lib/config";
import { calculateTimeDifference } from "../../lib/functions";
import Link from "next/link";

const DetailNews = ({ dataNewsDetail, dataRelatedNews }) => {
  return (
    <div className="box-container-category-news">
      <div className="in-box-container-category-news pt-2">
        <div className="row box-content-category-news mx-0">
          <div className="col-12   mb-2 box_content_detail_news">
            <Breadcrumb
              nameFirstItem={{
                link: "/news",
                label: "Tin tức",
              }}
              nameItem={dataNewsDetail?.news_desc?.title}
            />
          </div>
          <div className="col-12 px-0 mb-2">
            <div className="box_content_detail_news">
              <div className="container_content_news mb-3">
                <div className="box_title_news">
                  <span>{dataNewsDetail?.news_desc?.title}</span>
                </div>
                <div className="box_create_news">
                  <span>
                    {calculateTimeDifference(dataNewsDetail?.date_post)}
                  </span>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataNewsDetail?.news_desc?.description,
                  }}
                />{" "}
              </div>

              {dataRelatedNews && dataRelatedNews.length > 0 && (
                <div className="box_news_related row mx-0">
                  <div className="title_related_news">
                    <span>Bài viết liên quan</span>
                  </div>

                  {dataRelatedNews.map((item, index) => (
                    <div
                      className="col-lg-3 col-6 px-1 my-1"
                      key={item.news_id}
                    >
                      <div className="card_news ">
                        <Link
                          href={`/news/${item.url_cat}/${item.friendly_url}`}
                        >
                          <div className="card_news_image image custom-img-sale-news">
                            <Image
                              quality={100}
                              height={0}
                              width={0}
                              sizes="100vw"
                              alt={item.title}
                              src={hostImage + item.picture}
                              // className="w-100 h-100"
                            />
                          </div>
                          <div className="">
                            <span className="title_news_card text_genaral_two_line_2">
                              {item.title}
                            </span>
                            <span className="description_news_card text_genaral_three_line_2">
                              {item.short}
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailNews;
