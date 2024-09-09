import Footer from "../../../components/footer";
import Header from "../../header/header";
import Breadcrumb from "../../../components/breadcrumb";
import ContentDetailPageType from "./contentDetailPageType";
import "../../../../public/css/cssTypePromotion.css";
import { hostApi } from "../../lib/config";

async function fetchDataDetailPageType(url, typePage) {
  let apiUrl =
    typePage === "dich-vu"
      ? `${hostApi}/member/detail-service/${url}`
      : `${hostApi}/member/detail-about/${url}`;

  try {
    const response = await fetch(apiUrl, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return typePage === "dich-vu" ? data.service : data.data;
  } catch (error) {
    console.error("Fetch error: ", error.message || error);
  }
}

export default async function Page({ params }) {
  const data = await fetchDataDetailPageType(
    params?.detailPageType,
    params?.typePage
  );

  return (
    <div className="container-fluid px-0 container_cart">
      <Header />
      <div className="box-container-content-homepage">
        <div className="row container-content-homepage">
          <div className="col-12 box_container_slider_product my-2">
            <Breadcrumb
              nameFirstItem={{
                link: "/dich-vu",
                label: "Dịch vụ",
              }}
              nameItem={data?.title}
            />

            <ContentDetailPageType
              keyActive={params?.detailPageType}
              type={params?.typePage}
              data={data}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
