import Image from "next/image";
import { hostImage } from "../lib/config";
import { calculateTimeDifference } from "../lib/functions";
import Link from "next/link";

const CardNews = ({ item }) => {
  return (
    <Link href={`/news/${item?.url_cat}/${item?.friendly_url}`}>
      <div className="row   item_post_news">
        <div className="col-md-4  px-1 col-5 col-lg-5 col-xl-4">
          <div className="box_img_card_news image custom-img-card-news ">
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
        <div className="col-md-8 col-7 col-lg-7 col-xl-8">
          <div className="text_title_card_news">
            <span>{item.title}</span>
          </div>
          <div className="text_description_card_news">
            <span>{item.short}</span>
          </div>
          <div className="box_author mt-1">
            <span> {calculateTimeDifference(item.date_post)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardNews;
