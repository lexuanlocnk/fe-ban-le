import { Tooltip } from "antd";
import { UseAppContext } from "../app/lib/appProvider";
import Image from "next/image";
const ComponentCardProduct = ({ item, col }) => {
  const { showModal } = UseAppContext();

  return (
    <div
      className={`${
        col ? col : "col-md-custom-3"
      }   col-6 container_item_card `}
    >
      <div className="row box_item_card overflow-hidden  ">
        <div className="box_hover_item_card d-none d-md-block bg-white d-flex align-items-center justify-content-center px-1">
          <div className="row w-100 mx-0 h-100 ">
            <div className="col-9 px-0 d-flex align-items-center container_info_small ">
              <div className="box_all_icon_product">
                <div className="col_icon_specifications">
                  <Image
                    quality={75}
                    height={0}
                    width={0}
                    sizes="100vw"
                    src="/image/cpu.png"
                    className="icon_specifications"
                    alt="img_icon_share"
                  />
                  <span className="text_specifications">Intel Core i7</span>
                </div>
                <div className="col_icon_specifications">
                  <Image
                    quality={75}
                    height={0}
                    width={0}
                    sizes="100vw"
                    src="/image/ram.png"
                    className="icon_specifications"
                    alt="img_icon_share"
                  />
                  <span className="text_specifications">16GB</span>
                </div>
                <div className="col_icon_specifications">
                  <Image
                    quality={75}
                    height={0}
                    width={0}
                    sizes="100vw"
                    src="/image/display.png"
                    className="icon_specifications"
                    alt="img_icon_share"
                  />
                  <span className="text_specifications">13.3 inch QHD</span>
                </div>
                <div className="col_icon_specifications">
                  <Image
                    quality={75}
                    height={0}
                    width={0}
                    sizes="100vw"
                    src="/image/database.png"
                    className="icon_specifications"
                    alt="img_icon_share"
                  />
                  <span className="text_specifications">1TB SSD</span>
                </div>
                {/* <BtnShareProduct /> */}
              </div>
            </div>
            <div className="col-3 px-0">
              <div className="row d-flex align-items-center  justify-content-center w-100 box_btn_hot_product mx-0 h-100">
                <div className="px-0">
                  <Tooltip
                    placement="right"
                    title="Thêm vào giỏ hàng"
                    arrow={false}
                  >
                    <div className="item_btn_hot_product w-100">
                      <Image
                        quality={75}
                        height={0}
                        width={0}
                        sizes="100vw"
                        src="/image/shopping-cart.png"
                        className="img_btn_hot_product"
                        alt="img_icon_share"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip placement="right" title="Mua sản phẩm" arrow={false}>
                    <div className="item_btn_hot_product w-100 py-1">
                      <Image
                        quality={75}
                        height={0}
                        width={0}
                        sizes="100vw"
                        src="/image/buy.png"
                        className="img_btn_hot_product"
                        alt="img_icon_share"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip
                    placement="right"
                    title="So sánh sản phẩm"
                    arrow={false}
                  >
                    <div
                      onClick={() => showModal(item)}
                      className="item_btn_hot_product w-100"
                    >
                      {" "}
                      <Image
                        quality={75}
                        height={0}
                        width={0}
                        sizes="100vw"
                        src="/image/compare.png"
                        className="img_btn_hot_product"
                        alt="img_icon_share"
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 overflow-hidden box_image_item_card image custom-product-selling">
          <img src={item.thumbnail} className="w-100 h-100 image_item_card " />
        </div>
        <div className="col-12 box_info_item_card pt-2 pb-3">
          <div className="box_name_hot_product d-flex justify-content-center align-items-center">
            <span className="text_genaral_two_line">{item.title}</span>
          </div>
          <div className="box_info_hot_product">
            <span className="text_genaral_two_line">{item.description}</span>
          </div>
          <div className=" mt-md-3 mt-1 mb-1 d-flex justify-content-center">
            <div className="box_price_hot_product">
              <span className="price_discount_hot_product   ">
                {" "}
                {(item.price * 10000).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              {item?.discountPercentage && (
                <span className="percent_discount_hot_product  ">
                  {item?.discountPercentage}%
                </span>
              )}
            </div>
          </div>
          {/* <div className="d-md-none d-block  box_btn_share_mobile">
            <BtnShareProduct />
          </div> */}
          <div className="d-md-none d-block   d-flex align-items-center justify-content-around">
            <Tooltip placement="top" title="Thêm vào giỏ hàng" arrow={false}>
              <div className="item_btn_hot_product w-100">
                <Image
                  quality={75}
                  height={0}
                  width={0}
                  sizes="100vw"
                  src="/image/shopping-cart.png"
                  className="img_btn_hot_product_2"
                  alt="img_icon_share"
                />
              </div>
            </Tooltip>

            <Tooltip placement="top" title="Mua sản phẩm" arrow={false}>
              <div className="item_btn_hot_product w-100 py-1">
                {" "}
                <Image
                  quality={75}
                  height={0}
                  width={0}
                  sizes="100vw"
                  src="/image/buy.png"
                  className="img_btn_hot_product_2"
                  alt="img_icon_share"
                />
              </div>
            </Tooltip>

            <Tooltip placement="top" title="So sánh sản phẩm" arrow={false}>
              <div
                onClick={() => showModal(item)}
                className="item_btn_hot_product w-100"
              >
                {" "}
                <Image
                  quality={75}
                  height={0}
                  width={0}
                  sizes="100vw"
                  src="/image/compare.png"
                  className="img_btn_hot_product_2"
                  alt="img_icon_share"
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComponentCardProduct;
