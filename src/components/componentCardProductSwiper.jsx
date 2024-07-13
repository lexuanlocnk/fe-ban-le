"use client";
import Image from "next/image";
import { PlusCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { hostImage } from "../app/lib/config";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ComponentCardProductSwiper = ({ item }) => {
  const { status } = useSession();

  return (
    <div className="w-100 bg-white px-2 pt-2 pb-2   box-card-selling-product mt-2 mb-3 cursor-pointer">
      <Link className="" href={"/detail-product/" + item.friendlyUrl}>
        <div className="box-img-selling-product image custom-product-selling ">
          <Image
            quality={100}
            height={45}
            width={45}
            sizes="100vw"
            src={hostImage + item.picture}
            alt={item.productName}
            className="w-100 h-100"
          />
        </div>
      </Link>

      <div className="box-info-selling-product">
        <div className="info-selling-product p-md-3 p-2">
          <div className="box-name-selling-product color-product-selling">
            <Tooltip title={item.productName} color={"#2db7f5"}>
              <Link className="" href={"/detail-product/" + item.friendlyUrl}>
                <h6 className="name-selling-product mb-1  text_genaral_two_line_2">
                  {item.productName}
                </h6>
              </Link>
            </Tooltip>
          </div>
          <div className="box-detail-selling-product color-product-selling mb-2">
            <span className="css-text-general">{item.short}</span>
          </div>
          <div className="box-price-selling-product color-product-selling  d-flex align-items-center justify-content-between cursor-pointer">
            <h6 className=" d-inline h6-responsive">
              {status === "unauthenticated"
                ? // Đoạn mã khi không xác thực
                  item.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })
                : // Đoạn mã khi đã xác thực
                status === "loading"
                ? "Đang cập nhật"
                : item.priceOld.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
            </h6>
            <div className="d-inline float-right mr-1 ">
              <PlusCircleOutlined className="icon-plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComponentCardProductSwiper;
