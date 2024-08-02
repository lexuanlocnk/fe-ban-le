import Link from "next/link";
import { Fragment } from "react";
import { FaHome } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Breadcrumb = ({ nameItem, nameFirstItem, breadcrumbData }) => {
  return (
    <div className="box_breadcrumb_category  ">
      <div className=" breadcrumb_category  ">
        <Link href={"/"}>
          {" "}
          <FaHome className="icon_home" />
        </Link>
        {breadcrumbData &&
          Object.keys(breadcrumbData).length > 0 &&
          Object.values(breadcrumbData).map((item, index) =>
            item && item.url != null ? (
              <Fragment key={index}>
                <FaAngleRight />
                <span>
                  <Link href={`/category/${item.url}`}>{item.cat_name}</Link>
                </span>
              </Fragment>
            ) : null
          )}

        {nameFirstItem && (
          <>
            <FaAngleRight />
            <span>
              {" "}
              <Link href={nameFirstItem.link}>{nameFirstItem.label}</Link>{" "}
            </span>
          </>
        )}

        {nameItem && (
          <>
            <FaAngleRight />
            <span> {nameItem}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
