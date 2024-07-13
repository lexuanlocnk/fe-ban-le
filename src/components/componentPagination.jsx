"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Pagination } from "antd";
import { useCallback } from "react";

export default function ComponentPagination({ data, pageSize, page }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageURL = useCallback(
    (page) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", page);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams]
  );

  return (
    <div className="d-flex justify-content-end">
      <Pagination
        // style={{ float: "right" }}
        // showSizeChanger
        showQuickJumper
        // showTotal={(total) => `${total} sản phẩm`}
        defaultPageSize={pageSize}
        current={page ? page : data.current_page}
        total={data.total}
        showSizeChanger={false}
        defaultCurrent={1}
        onChange={createPageURL}
      />
    </div>
  );
}
