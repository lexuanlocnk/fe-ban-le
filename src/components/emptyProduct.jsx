import Link from "next/link";
import { BsFillCartXFill } from "react-icons/bs";

const EmptyProduct = ({ text }) => {
  return (
    <div>
      <div className="icon_empty text-center">
        <BsFillCartXFill />
        <span>{text}</span>
      </div>
      <div className="box_btn">
        <Link href={"/"}>
          <div className="btn_back_home">
            <span>VỀ TRANG CHỦ</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmptyProduct;
