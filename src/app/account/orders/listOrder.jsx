import Image from "next/image";
import Link from "next/link";

const ListOrder = ({ dataOrder }) => {
  const statusOrder = {
    waitForPay: "Chờ thanh toán",
    waitForDelivery: "Chờ giao hàng",
    paid: "Đã thanh toán",
  };

  return (
    <div className="box_list_order mt-2">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Ngày mua</th>
            <th className="col_name_product" scope="col">
              Sản phẩm{" "}
            </th>
            <th scope="col">Tổng tiền </th>
            <th scope="col">Số lượng </th>

            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {dataOrder &&
            dataOrder?.length > 0 &&
            dataOrder?.map((item, index) => (
              <tr className="item_row_product" key={index}>
                <td>
                  <div className="d-flex justify-content-center align-items-center ">
                    <Link href={`/account/order/${item.codeOrder}`}>
                      <div className="box_image_product">
                        <Image
                          alt={item.product}
                          src={item.imageUrl}
                          width={90}
                          height={80}
                          quality={100}
                        />
                      </div>
                    </Link>
                  </div>
                </td>
                <td>
                  <Link href={`/account/order/${item.codeOrder}`}>
                    <span className="code_item_order">{item.codeOrder}</span>
                  </Link>
                </td>
                <td className="value_item_order">{item.dayShopping}</td>
                <td>
                  <span className="value_item_order text_genaral_one_line">
                    {item.product}
                  </span>
                </td>
                <td className="value_item_order">
                  {item.totalAmount.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="value_item_order">Số lượng: {item.quantity}</td>

                <td>
                  <span
                    className={`value_item_status ${
                      item.statusOrder == "waitForDelivery"
                        ? "status_wait_ship"
                        : item.statusOrder == "waitForPay"
                        ? "status_wait_pay"
                        : "status_paid"
                    }`}
                  >
                    {statusOrder[item.statusOrder]}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOrder;
