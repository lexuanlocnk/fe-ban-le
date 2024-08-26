import Image from "next/image";
import SuggestedProducts from "../detail-product/[slugProduct]/suggestedProducts";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import { BsNewspaper } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { GrTechnology } from "react-icons/gr";
import ContentContact from "../../components/info-contact/contentContact";
import InfoHeader from "./infoHeader";
import SearchProduct from "../detail-product/[slugProduct]/searchProduct";
import Link from "next/link";
import LeftHeaderDetail from "./leftHeaderDetail";
import { hostApi } from "../lib/config";

function ContentHeader() {
  const categories = [
    {
      key: "promotionInformation",
      allowLink: true,
      title: "Tin khuyến mãi",
      link: "/news/tin-khuyen-mai",
      icon: <IoMdPricetags />,
    },
    {
      key: "buildConfiguration",
      allowLink: true,
      title: "Xây dựng cấu hình",
      link: "/build-configuration",
      icon: <IoBuild />,
    },
    {
      key: "techNews",
      allowLink: true,
      title: "Tin công nghệ",
      link: "/news?categoryNews=tin-cong-nghe",
      icon: <GrTechnology />,
    },
    {
      key: "news",
      allowLink: true,
      title: "Tin tức",
      link: "/news",
      icon: <BsNewspaper />,
    },

    {
      key: "contact",
      allowLink: false,
      title: "Liên hệ",
      link: "/news",
      icon: <MdOutlineSupportAgent />,
    },

    {
      key: "recruitment",
      allowLink: true,
      title: "Tuyển dụng",
      link: "https://vitinhnguyenkim.com.vn/tuyen-dung",
      icon: <FiUserPlus />,
    },
  ];

  return (
    <>
      <div className="box_image_banner_top_header">
        <Image
          priority
          src={"/image/banner_top_header.gif"}
          quality={100}
          height={0}
          width={0}
          sizes="100vw"
          className="w-100 h-100"
          alt="header-image"
        />
      </div>
      <div className="container_category_header">
        <div className="category_header custom_scroll row mx-0 h-100">
          <div className="col-lg-2 col-md-2 d-md-block d-none left_box_category_header"></div>
          <div className="col-lg-10 col-md-10 col-12 box_category_header">
            {categories &&
              categories?.length > 0 &&
              categories.map((item, index) => (
                <div
                  key={index}
                  className={`item_category_header ${
                    item.key == "contact" ? "hover_item_contact" : ""
                  }`}
                >
                  {item.icon}
                  {item &&
                    (item.allowLink ? (
                      item.key !== "recruitment" ? (
                        <Link href={item.link}>{item.title}</Link>
                      ) : (
                        <Link target="_blank" href={item.link}>
                          {item.title}
                        </Link>
                      )
                    ) : (
                      <>
                        <span>{item.title}</span>
                        <div className="box_contact_header">
                          <ContentContact />
                        </div>
                      </>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      <header id="main-header-detail" className="">
        <div className="content-header-detail row bg-white  ">
          <LeftHeaderDetail />
          <div className="right-header-detail col-xl-10 col-md-10 col-12 mt-1">
            <div className="content-right-header-detail-1 row mx-0">
              <div className="search-product d-flex col-md-7 col-12 px-0    flex-column">
                <SearchProduct />
                <div className="list-suggest-product">
                  <SuggestedProducts />
                </div>
              </div>

              <InfoHeader />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default ContentHeader;
