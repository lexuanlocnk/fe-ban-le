"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Pagination } from "antd";

export default function PaginationServer({ data, page, pageSize }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageURL = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Pagination
      style={{ float: "right" }}
      defaultPageSize={pageSize}
      current={page}
      total={data?.totalProduct}
      showSizeChanger={false}
      defaultCurrent={1}
      onChange={createPageURL}
    />
  );
}
