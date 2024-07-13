"use client";

import Link from "next/link";
import MenuAccount from "../../menuAccount";
import { useParams } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import ContentDetailOrder from "./contentDetailOrder";
import Breadcrumb from "../../../../components/breadcrumb";

const ContentDetail = () => {
  const params = useParams();

  const defaultMenuItem = {
    id: 3,
    name: "Quản lý đơn hàng",
  };

  return (
    <div className="box-container-content-account">
      <div className="in-box-container-content-account pt-2">
        <div className="row box-content-account mx-0">
          <div className="col-12 ">
            <Breadcrumb nameItem={defaultMenuItem.name} />
          </div>

          <MenuAccount defaultMenuItem={defaultMenuItem} />
          <div className="col-9  mt-2">
            <div className="back_orders">
              <Link href={"/account/orders"}>
                <IoMdArrowRoundBack className="icon_back" />
              </Link>
              <span className="title_order">ĐƠN HÀNG: {params?.idOrder}</span>
            </div>
            <ContentDetailOrder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
