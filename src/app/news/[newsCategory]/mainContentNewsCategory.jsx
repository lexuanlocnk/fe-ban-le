import dayjs from "dayjs";
import Image from "next/image";
import { hostApi, hostImage } from "../../lib/config";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Link from "next/link";
import ComponentPagination from "../../../components/componentPagination";
dayjs.extend(customParseFormat);

async function fetchDataNewsPromotion(pageValue) {
  try {
    const response = await fetch(
      `${hostApi}/member/promotion-list?page=${pageValue}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.list;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const MainContentNewsCategory = async ({ page }) => {
  const dataNewsPromotion = await fetchDataNewsPromotion(page);

  return (
    <div className="col-12 main_content_news_category mt-2 mb-3">
      <div className="row mx-0">
        <div className="col-12  mb-2 d-flex align-items-center">
          <Image
            src="/image/icon_image/loudspeaker.png"
            width={40}
            height={40}
            alt="icon_image"
            quality={75}
          />
          <span className="text_title_common ms-2">Tin khuyến mãi</span>
        </div>
        {dataNewsPromotion && dataNewsPromotion?.data?.length > 0 ? (
          dataNewsPromotion?.data?.map((item, index) => (
            <div className=" col-xl-3 my-2 px-2  " key={item.promotion_id}>
              <div className="item_news_category">
                <Link
                  href={`/news/tin-khuyen-mai/${item?.promotion_desc?.friendly_url}`}
                >
                  <div className="image custom-img-sale-news box_image_card_news_category overflow-hidden">
                    <Image
                      quality={100}
                      alt="banner-image"
                      height={0}
                      width={0}
                      sizes="100vw"
                      src={hostImage + item.picture}
                      className="  w-100 h-100"
                    />
                  </div>
                </Link>

                <div className="box_content_card_news_category mx-2 my-1">
                  <Link
                    href={`/news/tin-khuyen-mai/${item?.promotion_desc?.friendly_url}`}
                  >
                    <span className="title text_genaral_two_line">
                      {item?.promotion_desc?.title}
                    </span>
                  </Link>
                </div>
                <div className="btn_see_detail_news_category mx-2 my-1">
                  {dayjs().isAfter(
                    dayjs(item.date_end_promotion, "DD/MM/YYYY")
                  ) ? (
                    <>
                      <span className="btn_disabled">
                        Chương trình khuyến mãi đã kết thúc
                      </span>
                    </>
                  ) : dayjs().isBefore(
                      dayjs(item.date_start_promotion, "DD/MM/YYYY")
                    ) ? (
                    <>
                      <span className="btn_disabled">
                        Chương trình sắp bắt đầu
                      </span>
                    </>
                  ) : (
                    <>
                      <p className="timeline mb-0">
                        {item.date_start_promotion} - {item.date_end_promotion}
                      </p>
                      <span> Xem chi tiết</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="box_data_news_promotion_empty">
            <Image
              alt="empty_cart"
              quality={75}
              width={150}
              height={130}
              src={"/image/empty-cart.png"}
            />

            <span>Chưa có tin khuyến mãi !</span>
          </div>
        )}
      </div>

      {dataNewsPromotion && dataNewsPromotion.total > 8 && (
        <div className="col-12 ">
          {" "}
          <ComponentPagination pageSize={8} data={dataNewsPromotion} />{" "}
        </div>
      )}
    </div>
  );
};
export default MainContentNewsCategory;
