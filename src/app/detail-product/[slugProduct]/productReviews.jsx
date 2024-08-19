"use client";

import React, { useState } from "react";
import { Input } from "antd";
import { SendOutlined, FieldTimeOutlined } from "@ant-design/icons";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { hostApi } from "../../lib/config";
import { useSession } from "next-auth/react";
import { UseAppContext } from "../../lib/appProvider";
import ModalInfoComment from "./modalInfoComment";

const { TextArea } = Input;

const ProductReviews = ({ comments, productId }) => {
  const { openNotificationWithIcon } = UseAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, status } = useSession();
  const [valueComment, setValueComment] = useState("");

  const handleSubmitComment = async (valuesComment) => {
    let values = {};

    if (status == "unauthenticated") {
      values = {
        ...valuesComment,
        productId: productId,
        content: valueComment,
      };
    } else {
      values = {
        userId: data.user.id,
        content: valueComment,
        productId: productId,
      };
    }
    try {
      const response = await fetch(`${hostApi}/member/add-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const dataRes = await response.json();
      if (dataRes.status) {
        setValueComment("");
        openNotificationWithIcon(
          "success",
          "Bình luận",
          `Bình luần thành công!`
        );
      }
    } catch (error) {
      console.error("Err:", error);
    }
  };

  const renderReviewAvatar = (reviewer) => (
    <div className="box_image_account">
      <span className="avatar_name">
        {reviewer?.split(" ").pop().charAt(0)}
      </span>
    </div>
  );
  const formatTimeDifference = (createdAt) => {
    const now = new Date();
    const daysDiff = differenceInDays(now, createdAt);

    if (daysDiff >= 365) {
      return `${Math.floor(daysDiff / 365)} năm ${daysDiff % 365} ngày`;
    } else if (daysDiff > 0) {
      return `${daysDiff} ngày`;
    } else {
      const hoursDiff = differenceInHours(now, createdAt);
      const minutesDiff = differenceInMinutes(now, createdAt) % 60;
      return `${hoursDiff} giờ ${minutesDiff} phút`;
    }
  };

  return (
    <>
      <div className="col-12 box-review-product bg-white my-2 p-3">
        <div className="row mb-2">
          <div className="col-12 ques-anwer">
            <span className="">Hỏi và đáp</span>
          </div>
        </div>
        <div className="row  mb-3">
          <div className="col-md-11 col-10  box-input-user-review">
            <TextArea
              className="custom-text-area"
              value={valueComment}
              onChange={(e) => setValueComment(e.target.value)}
              placeholder="Xin mời để lại câu hỏi, QuangBao sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
              autoSize={{ minRows: 2, maxRows: 3 }}
            />
          </div>
          <div className="col-md-1  col-2 d-flex align-items-center">
            <button
              onClick={() =>
                status === "unauthenticated"
                  ? setIsModalOpen(true)
                  : handleSubmitComment
              }
              className="btn btn-primary w-100"
            >
              {" "}
              Gửi
              <SendOutlined className="ms-1" />
            </button>
          </div>
        </div>

        {comments &&
          comments.length > 0 &&
          comments.map((item, index) => (
            <div className="row my-3" key={item.comment_id}>
              <div className="col-md-12 col-12">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-between">
                    <div className="box-img-name-user-review d-flex align-items-center">
                      {renderReviewAvatar(item?.name)}

                      <span className="name-user-reviews  ">{item.name}</span>
                    </div>
                    <span className="time-user-reviews d-flex align-items-center">
                      <FieldTimeOutlined className="mr-1" />{" "}
                      {formatTimeDifference(item.created_at)}
                    </span>{" "}
                  </div>
                  <div className="input-text-user-review col-12 mt-2 px-5">
                    <div className="box-content-comment">
                      <div className="content-comment p-2">
                        <p className="content px-3 mb-0">{item.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {item.subcomments && (
                  <div
                    className="row box-admin-reply mt-2"
                    key={item.subcomments.comment_id}
                  >
                    <div className="col-md-12 d-flex justify-content-between">
                      <div className="box-img-name-user-review d-flex align-items-center">
                        {renderReviewAvatar(item.subcomments.name)}

                        <span className="name-user-reviews  ">
                          {item.subcomments.name}
                        </span>
                      </div>
                      <span className="time-user-reviews d-flex align-items-center">
                        <FieldTimeOutlined className="mr-1" />{" "}
                        {formatTimeDifference(item.created_at)}
                      </span>{" "}
                    </div>
                    <div className="input-text-user-review col-12 mt-2 px-5">
                      <div className="box-content-comment">
                        <div className="content-comment p-2  ">
                          <p className="content px-3 mb-0">
                            {item.subcomments.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      {status && status === "unauthenticated" && (
        <ModalInfoComment
          handleSubmitComment={handleSubmitComment}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default ProductReviews;
