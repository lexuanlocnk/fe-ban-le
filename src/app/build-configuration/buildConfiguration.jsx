"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import ItemConfiguration from "./itemConfiguration";
import ConfigurationStatistics from "./configurationStatistics";
import { hostApi } from "../lib/config";
import axios from "axios";
import { UseAppContext } from "../lib/appProvider";

const BuildConfiguration = ({ dataBuildPc }) => {
  const [checkedConfiguration, setCheckedConfiguration] = useState({
    idConfiguration: 1,
    name: "Cấu hình 1",
  });
  const [accessories, setAccessories] = useState({});

  const { openNotificationWithIcon } = UseAppContext();

  useEffect(() => {
    const storedAccessories = localStorage.getItem("accessories");

    if (storedAccessories) {
      setAccessories(JSON.parse(storedAccessories));
    }
  }, []);

  const listConfiguration = [
    {
      idConfiguration: 1,
      name: "Cấu hình 1",
    },
    {
      idConfiguration: 2,
      name: "Cấu hình 2",
    },
    {
      idConfiguration: 3,
      name: "Cấu hình 3",
    },
  ];

  const handleDownloadConfig = async () => {
    if (
      !accessories[checkedConfiguration.idConfiguration] ||
      Object.keys(accessories[checkedConfiguration.idConfiguration]).length ===
        0
    ) {
      openNotificationWithIcon(
        "warning",
        "Tải cấu hình",
        "Cấu hình không tồn tại linh kiện"
      );
      return;
    }

    try {
      const configKey = JSON.stringify(
        accessories[checkedConfiguration.idConfiguration]
      );

      const response = await axios.get(`${hostApi}/member/export-excel-pc`, {
        responseType: "blob",
        params: { key: configKey },
        headers: { "Content-Type": "application/json" },
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "build-pc.xlsx");
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the configuration:", error);
    }
  };

  return (
    <div className="box-container-content-category  ">
      <div className="in-box-container-content-category pt-1">
        <div className="row box-content-category mx-0">
          <div className="col-12 build-configuration-header">
            <Breadcrumb nameItem={"Xây dựng cấu hình"} />
          </div>
          <div className="my-2 col-8">
            <span className="text_title_common">
              Xây dựng cấu hình máy tính
            </span>
          </div>
          <div className="col-4"></div>

          <div className="d-flex justify-content-between align-items-center col-8">
            <div className="box_select_configuration">
              {listConfiguration.map((item, index) => (
                <div
                  onClick={() => setCheckedConfiguration(item)}
                  className={`item_select_configuration ${
                    checkedConfiguration.idConfiguration == item.idConfiguration
                      ? "active_configuration"
                      : ""
                  }`}
                  key={index}
                >
                  <span className=" ">{item.name}</span>
                </div>
              ))}
            </div>

            <div className="btn_save_down_configuration">
              <div
                onClick={handleDownloadConfig}
                className="down_configuration"
              >
                <span>Tải cấu hình</span>
              </div>
              <div className="save_configuration">
                <span>Lưu cấu hình</span>
              </div>
            </div>
          </div>
          <div className="col-4"></div>

          <div className="col-8">
            <div className="mt-2 ">
              <ItemConfiguration
                dataBuildPc={dataBuildPc}
                checkedConfiguration={checkedConfiguration}
                setAccessories={setAccessories}
                accessories={accessories}
              />
            </div>
          </div>
          <div className="col-4">
            <ConfigurationStatistics
              accessories={accessories}
              idConfiguration={checkedConfiguration.idConfiguration}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildConfiguration;
