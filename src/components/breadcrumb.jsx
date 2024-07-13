import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Breadcrumb = ({ nameItem, nameFirstItem }) => {
  return (
    <div className="box_breadcrumb_category  ">
      <div className=" breadcrumb_category  ">
        <Link href={"/"}>
          {" "}
          <FaHome className="icon_home" />
        </Link>

        {nameFirstItem && (
          <>
            <FaAngleRight />
            <span>
              {" "}
              <Link href={nameFirstItem.link}>{nameFirstItem.label}</Link>{" "}
            </span>
          </>
        )}
        <FaAngleRight />
        <span> {nameItem}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;
