import dayjs from "dayjs";
import Link from "next/link";
import { Tooltip } from "antd";
import "dayjs/locale/vi";
import Image from "next/image";
dayjs.locale("vi");

const ListOrder = ({ dataOrder, activeStatusOrder }) => {
  const statusColors = {
    pending: "#FFA500",
    "customer-response": "#FF4500",
    paid: "#32CD32",
    delivered: "#1E90FF",
    finished: "#6A5ACD",
    fail: "#8B0000",
    "customer-cancels": "#A9A9A9",
  };

  return (
    <div className="box_list_order custom_scroll mt-2">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Ngày mua</th>
            <th className="col_name_product" scope="col">
              Sản phẩm{" "}
            </th>
            <th scope="col">Tổng tiền </th>

            <th scope="col">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {dataOrder && dataOrder?.length > 0 ? (
            dataOrder?.map((item, index) => (
              <tr className="item_row_product" key={item.order_id}>
                <td>
                  <Link href={`/account/order/${item.order_id}`}>
                    <span className="code_item_order">{item.order_code}</span>
                  </Link>
                </td>
                <td className="value_item_order">
                  {" "}
                  {dayjs
                    .unix(item.date_order)
                    .format("dddd, HH:mm DD-MM-YYYY")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </td>
                <td>
                  {item.order_detail && item.order_detail.length > 1 ? (
                    <ol className="ps-2 value_item_order ">
                      {item.order_detail.map((item, index) => (
                        <Tooltip
                          color="#2db7f5"
                          placement="top"
                          key={index}
                          title={item.item_title}
                        >
                          <li className="name_product_manager my-1">
                            {item.item_title}
                          </li>
                        </Tooltip>
                      ))}
                    </ol>
                  ) : (
                    <span className="value_item_order ">
                      {item.order_detail.map((item, index) => (
                        <Tooltip
                          color="#2db7f5"
                          placement="top"
                          key={index}
                          title={item.item_title}
                        >
                          <span className="name_product_manager my-1">
                            {item.item_title}
                          </span>
                        </Tooltip>
                      ))}
                    </span>
                  )}
                </td>
                <td className="value_item_order">
                  <span className="total_order_manager">
                    {item.total_cart.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </td>

                <td>
                  <span
                    style={{ color: statusColors[activeStatusOrder] }}
                    className={`value_item_status `}
                  >
                    {item.order_status.title}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <td colSpan={5}>
              <div className="box_empty_product_manage_order">
                <Image
                  width={150}
                  height={150}
                  alt="Not Found Product"
                  src={"/image/img_not_found.png"}
                />
                <span>Bạn không có đơn hàng nào</span>
              </div>
            </td>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListOrder;
