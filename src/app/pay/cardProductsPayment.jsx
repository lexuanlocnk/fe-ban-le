import Image from "next/image";
import { hostImage } from "../lib/config";

const CardProductPayment = ({ item }) => {
  return (
    <div className="mb-0 my-2">
      <div className="box_product_checked  ">
        <div className="box_image_product_checked">
          <Image
            width={120}
            height={90}
            alt={item.item_title}
            src={hostImage + item.product.picture}
          />
        </div>
        <div className="box_content_product_checked">
          <div className="box_name_product_checked">
            <span className="">{item.item_title}</span>
          </div>
          <div className="info_basic_product_checked">
            {/* <span className="">Màu: {item.color}</span> */}
            <span className="">số lượng: {item.quantity}</span>
          </div>
          <div className="price_card_product_pay">
            <span className=" ">Giá: {item.subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductPayment;
