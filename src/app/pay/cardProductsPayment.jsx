import Image from "next/image";
import { hostImage } from "../lib/config";

const CardProductPayment = ({ item }) => {
  return (
    <div className="mb-0 my-2">
      <div className="pro_box_product_checked">
        <div className="box_product_checked  ">
          <div className="box_image_product_checked">
            <Image
              width={80}
              height={75}
              alt={item.ProductName}
              src={hostImage + item.Image}
            />
          </div>
          <div className="box_content_product_checked">
            <div className="box_name_product_checked">
              <span className="">{item.ProductName}</span>
            </div>
            <div className="info_basic_product_checked">
              {item?.Brand && (
                <span className="">Thương hiệu: {item?.Brand}</span>
              )}
              <span className="">số lượng: {item.quantity}</span>
            </div>
            <div className="price_card_product_pay">
              <span className="">
                Giá:{" "}
                {(item.quantity * parseFloat(item.PriceOld)).toLocaleString(
                  "vi",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
              </span>
            </div>
          </div>
        </div>
        {item?.checkPresent &&
          item?.checkPresent?.length > 0 &&
          item?.checkPresent.map((item, index) => (
            <div
              className="box_promotion_product"
              key={index}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          ))}
      </div>
    </div>
  );
};

export default CardProductPayment;
