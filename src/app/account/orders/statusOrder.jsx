"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const StatusOrder = ({ dataStatusOrder, activeStatusOrder }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageURL = (key) => {
    const params = new URLSearchParams(searchParams);

    params.set("statusOrder", key);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="box_status_order">
      {dataStatusOrder &&
        dataStatusOrder.length > 0 &&
        dataStatusOrder.map((item, index) => (
          <span
            onClick={() => createPageURL(item.keyStatus)}
            key={item.status_id}
            className={`item_status   ${
              activeStatusOrder === item.keyStatus ? "item_status_active" : ""
            }   `}
          >
            {item.title}
          </span>
        ))}
    </div>
  );
};

export default StatusOrder;
