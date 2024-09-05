import { hostApi, hostImage } from "../../lib/config";
import Breadcrumb from "../../../components/breadcrumb";
import { Card, Col, Row } from "antd";
import ComponentPagination from "../../../components/componentPagination";
import Link from "next/link";
import Image from "next/image";
async function fetchDataTypePage(valuePage) {
  try {
    const response = await fetch(
      `${hostApi}/member/show-all-service?page=${valuePage}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.services;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const ContentPageService = async ({ page }) => {
  const dataService = await fetchDataTypePage(page);

  return (
    <div className="box-container-content-homepage">
      <div className="row container-content-homepage">
        <div className="col-12 box_container_slider_product my-2">
          <Breadcrumb nameItem={"Dịch vụ"} />
          <div className="box-content-service mt-2">
            <div className="title_service text-center">
              <span>DỊCH VỤ</span>
            </div>
            <div className="box-card-service mt-1">
              <Row gutter={16}>
                {dataService?.data?.length > 0 &&
                  dataService.data.map((item) => (
                    <Col className="my-2" key={item?.service_id} span={8}>
                      <Link href={`/dich-vu/${item?.friendly_url}`}>
                        <Card
                          hoverable
                          cover={
                            <Image
                              quality={100}
                              height={200}
                              width={200}
                              sizes="100vw"
                              className=" "
                              alt={item?.title}
                              src={hostImage + item?.picture}
                            />
                          }
                        >
                          {" "}
                          {item?.title}
                        </Card>
                      </Link>
                    </Col>
                  ))}
              </Row>
            </div>
            {dataService && dataService?.data && dataService?.total > 6 && (
              <div className="col-12 mt-2">
                {" "}
                <ComponentPagination pageSize={6} data={dataService} />{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPageService;
