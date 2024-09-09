import Link from "next/link";
import { hostApi } from "../../lib/config";

async function fetchDataPostCompany(typePage) {
  try {
    const response = await fetch(`${hostApi}/member/show-all-about`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return data.services;
  } catch (error) {
    console.error("Fetch error: ", error.message || error);
  }
}

const ContentDetailPageType = async ({ data, type, keyActive }) => {
  let dataPostCompany = [];
  if (type && type === "ve-cong-ty") {
    dataPostCompany = await fetchDataPostCompany(type);
  }
  return (
    data && (
      <div className="box_content_detail_service">
        {type === "ve-cong-ty" &&
          dataPostCompany &&
          dataPostCompany?.data?.length > 0 && (
            <div className="box_post_link mb-2">
              {dataPostCompany?.data?.map((item, index) => (
                <Link
                  className={`${
                    item.friendly_url == keyActive
                      ? "active_box_title_link_post"
                      : ""
                  } box_title_link_post effect`}
                  href={`/ve-cong-ty/${item.friendly_url}`}
                >
                  {item?.friendly_title}
                </Link>
              ))}
            </div>
          )}
        <div className="title_post_detail_service text-center mb-2">
          <span>{data?.title}</span>
        </div>
        <div className="content_post_detail_service">
          <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        </div>
      </div>
    )
  );
};

export default ContentDetailPageType;
