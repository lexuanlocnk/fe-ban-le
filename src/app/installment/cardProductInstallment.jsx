import Image from "next/image";

const CardProductInstallment = ({ colorBg }) => {
  const product = {
    name: " Laptop Lenovo Ideapad 3 15IAU7 i3 1215U/8GB/256GB/Win11 (82RK00RWVN)",
    imageUrl: "/image/macbook2.png",
    price: 9190000,
    priceSale: 10990000,
    color: "Xám",
  };

  return (
    <div className={`row mx-0 box_card_product_installment ${colorBg || ""}`}>
      <div className="col-2 px-0">
        <div className="box_img_card_product_installment">
          <Image
            height={90}
            width={100}
            src={product.imageUrl}
            alt="image_product_installment"
          />
        </div>
      </div>
      <div className="col-10 d-flex flex-column justify-content-between">
        <div className="box_name_product_installment d-flex">
          <span className="name_product_installment text_genaral_two_line">
            {product.name}
          </span>
          <div className="box_price_product_installment">
            <span className="price_real">
              {product.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <s className="price_sale">
              {product.priceSale.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </s>
          </div>
        </div>
        <div className="box_color_product_installment">
          <span>Màu: {product.color}</span>
        </div>
      </div>
    </div>
  );
};

export default CardProductInstallment;
