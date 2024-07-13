"use client";

import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { Table, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import ComponentSwiper from "./componentSwiper";
const ModalSupportingSoftware = ({
  onClickClose,
  onClickOpen,
  imageShowPopup,
}) => {
  const [suitableEquipment, setSuitableEquipment] = useState([
    "/image/linhkien-1.jpg",
    "/image/linhkien2.jpg",
    "/image/linhkien3.jpg",
    "/image/linhkien4.jpg",
    "/image/linhkien5.jpg",
    "/image/linhkien6.jpg",
    "/image/linhkien7.jpg",
    "/image/linhkien8.jpg",
    "/image/linhkien9.jpg",
    "/image/linhkien10.jpg",
  ]);
  const columns = [
    {
      width: 200,
      title: "Yêu cầu",
      dataIndex: "request",
      key: "request",
      fixed: "left",
      render: (text, record) => {
        return (
          <Tag className="custom-tag-table" color={"green"} key={record.key}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Min setting",
      dataIndex: "min",
      key: "min",
      render: (text, record) => {
        return (
          <Tag className="custom-tag-table" color={"geekblue"} key={record.key}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Max setting",
      dataIndex: "max",
      key: "max",
      render: (text, record) => {
        return (
          <Tag className="custom-tag-table" color={"geekblue"} key={record.key}>
            {text}
          </Tag>
        );
      },
    },
  ];

  const dataSource = [
    {
      key: "1",
      request: "CPU",
      min: "2GHz",
      max: "Intel Core I5-4460 3.2 GHz",
    },
    {
      key: "2",
      request: "RAM",
      min: "4GB",
      max: "8GB RAM",
    },
    {
      key: "3",
      request: "Ổ cứng HDD",
      min: "10GB trống hoàn toàn",
      max: "250GB HDD",
    },
    {
      key: "4",
      request: "Card màn hình",
      min: "4GB",
      max: "8GB RAM",
    },
  ];

  return (
    <Modal className="testoyeah" show={true} onClose={onClickClose}>
      <Modal.Body className="box-popup-supporting-software">
        <div className="popup-supporting-software position-relative">
          <div className="row mx-0 box-btn-close">
            <div className="icon-close-popup top-0 col-12 my-3 ">
              <CloseCircleOutlined
                className="float-end"
                onClick={onClickClose}
              />
            </div>
          </div>
          <div className="header-supporting-software my-3 row mx-4 py-3 mx-0 ">
            <div className="col-2 px-4 ">
              <div className="image is-img-suppporting-software box-img-suppporting-software overflow-hidden ">
                <img
                  src={imageShowPopup}
                  className="w-100 h-100 img-game-supporting-software"
                  alt="logo game"
                />
              </div>
            </div>
            <div className="col-10 d-flex justify-content-center align-items-center">
              <h2>Liên Minh Huyền Thoại</h2>
            </div>
          </div>
          <div className="row px-4 pb-3 mx-0">
            <Table
              scroll={{
                x: 1500,
                y: 300,
              }}
              dataSource={dataSource}
              columns={columns}
            />
          </div>
          <div className="row px-4 pb-4 mx-0">
            <div className="col-12">
              <ComponentSwiper
                timeLoop={2500}
                dataSwiper={suitableEquipment}
                classCss={"px-4"}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSupportingSoftware;
