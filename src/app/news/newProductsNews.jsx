import Image from "next/image";

const NewProductsNews = () => {
  const productNews = [
    {
      imageUrl: "/image/macbook2.png",
      productName: "Laptop Dell XPS 13",
      numberPost: 13,
    },
    {
      imageUrl: "/image/macbook2.png",
      productName: "Laptop ASUS ZenBook 14",
      numberPost: 5,
    },
    {
      imageUrl: "/image/iphone1.png",
      productName: "Laptop HP Spectre x360",
      numberPost: 9,
    },
    {
      imageUrl: "/image/iphone2.png",
      productName: "Laptop Lenovo ThinkPad X1 Carbon",
      numberPost: 12,
    },
    {
      imageUrl: "/image/iphone3.png",
      productName: "Laptop Apple MacBook Pro 13",
      numberPost: 21,
    },
  ];

  return (
    <div className="row mx-0 box-top-news bg-white mb-3  ">
      <div className="col-12 text_see_more px-0">
        <span>Bài viết sản phẩm mới</span>
      </div>

      {productNews &&
        productNews?.length > 0 &&
        productNews?.map((item, index) => (
          <div key={index} className="col-12  item_product_news">
            <div className="row">
              <div className="col-md-3 p-2 col-5">
                <div className="box_img_product_news_post image custom-img-product-news  overflow-hidden img">
                  <Image
                    quality={75}
                    height={0}
                    width={0}
                    sizes="100vw"
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-100 h-100 img_hover_news_common"
                  />
                </div>
              </div>
              <div className="box_infor_product_news col-md-9 col-7 d-flex align-items-center">
                <div>
                  <div className="name_product_news">
                    <span>{item.productName}</span>
                  </div>
                  <div className="number_post">
                    <span>{item.numberPost} bài viết</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="col-12 text_show_more text-center px-0">
        <span>Xem thêm</span>
      </div>
    </div>
  );
};

export default NewProductsNews;
