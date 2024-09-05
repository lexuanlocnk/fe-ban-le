import Footer from "../../../components/footer";
import Header from "../../header/header";
import Breadcrumb from "../../../components/breadcrumb";
import ContentDetailPageType from "./contentDetailPageType";

export default function Page({ params }) {
  return (
    <div className="container-fluid px-0 container_cart">
      <Header />
      <div className="box-container-content-homepage">
        <div className="row container-content-homepage">
          <div className="col-12 box_container_slider_product my-2">
            <Breadcrumb nameItem={"Dịch vụ"} />

            <ContentDetailPageType url={params?.detailPageType} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
