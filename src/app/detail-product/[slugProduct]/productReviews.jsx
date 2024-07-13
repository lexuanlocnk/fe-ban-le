"use client";

import React, { useState } from "react";
import { Input } from "antd";
import {
  SendOutlined,
  UserOutlined,
  FieldTimeOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { differenceInDays, differenceInHours } from "date-fns";
import Image from "next/image";

const { TextArea } = Input;

const ProductReviews = () => {
  const [checkInputReply, setCheckInputReply] = useState([]);

  const [valueComment, setValueComment] = useState({
    responder: "Draco Vuong",
    timestamp: "",
    reply: "",
    avatar: "avatar-iconres1.png",
  });
  const [dataUsersReview, setDataUsersReview] = useState([
    {
      id: 1,
      avatar: "/image/avatar-icon1.png",
      reviewer: "Alice",
      timestamp: "2024-02-25 10:30:00",
      rating: 4,
      comment: "Sản phẩm rất tốt, tôi rất hài lòng.",
      replies: [
        {
          responder: "Bob",
          timestamp: "2024-02-26 15:45:00",
          reply: "Cảm ơn bạn đã chia sẻ ý kiến.",
          avatar: "/image/avatar-iconres1.png",
        },
        {
          responder: "Charlie",
          timestamp: "2024-02-27 09:20:00",
          reply: "Chúng tôi rất vui vì bạn hài lòng với sản phẩm.",
          avatar: "/image/avatar-iconres1.png",
        },
      ],
    },
    {
      id: 2,

      avatar: "/image/avatar-icon2.png",

      reviewer: "David",
      timestamp: "2024-02-26 12:15:00",
      rating: 5,
      comment: "Sản phẩm hoàn hảo, không có gì để chê cả.",
      replies: [
        {
          responder: "Draco V",
          timestamp: "2024-02-27 09:20:00",
          reply: "Chúng tôi rất vui vì bạn hài lòng với sản phẩm.",
          avatar: "/image/avatar-iconres1.png",
        },
      ],
    },

    {
      id: 5,

      avatar: "/image/avatar-icon5.png",

      reviewer: "Grace",
      timestamp: "2024-02-27 11:30:00",
      rating: 2,
      comment: "Không hài lòng với sản phẩm này, không đáng giá tiền.",
      replies: [
        {
          responder: "Michael Jackson",
          timestamp: "2024-02-22 09:20:00",
          reply: "Chúng tôi rất vui vì bạn hài lòng với sản phẩm.",
          avatar: "/image/avatar-iconres1.png",
        },
      ],
    },
  ]);

  const handleCommentChange = (e) => {
    setValueComment((prevState) => ({
      ...prevState,
      reply: e.target.value,
      timestamp: new Date(),
    }));
  };

  const handleSubmitComment = (reviewId, newReply) => {
    setCheckInputReply((prevState) => {
      const newState = {};
      for (const key in prevState) {
        newState[key] = false;
      }
      return newState;
    });

    setDataUsersReview((prevReviews) =>
      prevReviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            replies: [...review.replies, newReply],
          };
        }
        return review;
      })
    );
  };

  const handleReplyComment = (id) => {
    setCheckInputReply((prevState) => {
      const newState = { ...prevState };

      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });

      newState[id] = prevState[id] ? false : true;

      return newState;
    });
  };

  return (
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
            value={valueComment.reply}
            onChange={handleCommentChange}
            placeholder="Xin mời để lại câu hỏi, QuangBao sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
            autoSize={{ minRows: 2, maxRows: 3 }}
          />
        </div>
        <div className="col-md-1  col-2 d-flex align-items-center">
          <button
            onClick={() => handleSubmitComment()}
            className="btn btn-primary w-100"
          >
            {" "}
            Gửi
            <SendOutlined className="ms-1" />
          </button>
        </div>
      </div>
      {dataUsersReview &&
        dataUsersReview.map((item, index) => (
          <div className="row my-3" key={index}>
            <div className="col-md-12 col-12">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                  <div className="box-img-name-user-review d-flex align-items-center">
                    <Image
                      quality={75}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="avatar-user-reviews"
                      src={item.avatar}
                      alt="img_icon_share"
                    />
                    <span className="name-user-reviews  ">{item.reviewer}</span>
                  </div>
                  <span className="time-user-reviews d-flex align-items-center">
                    <FieldTimeOutlined className="mr-1" />{" "}
                    {differenceInDays(new Date(), item.timestamp) > 0 ? (
                      <span className=" ">
                        {differenceInDays(new Date(), item.timestamp) + " ngày"}{" "}
                      </span>
                    ) : (
                      <span className=" ">
                        {differenceInDays(new Date(), item.timestamp) + " giờ"}{" "}
                      </span>
                    )}
                  </span>{" "}
                </div>
                <div className="input-text-user-review col-12 mt-2 px-5">
                  <div className="box-content-comment">
                    <div className="content-comment p-2 pb-0">
                      <p className="content px-3 mb-0">{item.comment}</p>
                    </div>
                    <div className="btn-reply-comment">
                      <p
                        className="btn-reply"
                        onClick={() => handleReplyComment(item.id)}
                      >
                        {" "}
                        <MailOutlined className="mr-1" />
                        Trả lời
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {item.replies &&
                item.replies.map((itemReplies, indexReplies) => (
                  <div className="row box-admin-reply mt-2" key={indexReplies}>
                    <div className="col-md-12 d-flex justify-content-between">
                      <div className="box-img-name-user-review d-flex align-items-center">
                        <img
                          className="avatar-user-reviews"
                          src={itemReplies.avatar}
                        />
                        <span className="name-user-reviews  ">
                          {itemReplies.responder}
                        </span>
                      </div>
                      <span className="time-user-reviews d-flex align-items-center">
                        <FieldTimeOutlined className="mr-1" />{" "}
                        {differenceInDays(new Date(), itemReplies.timestamp) >
                        0 ? (
                          <span className=" ">
                            {differenceInDays(
                              new Date(),
                              itemReplies.timestamp
                            ) + " ngày"}{" "}
                          </span>
                        ) : (
                          <span className=" ">
                            {differenceInDays(
                              new Date(),
                              itemReplies.timestamp
                            ) + " giờ"}{" "}
                          </span>
                        )}
                      </span>{" "}
                    </div>
                    <div className="input-text-user-review col-12 mt-2 px-5">
                      <div className="box-content-comment">
                        <div className="content-comment p-2 pb-0">
                          <p className="content px-3 mb-0">
                            {itemReplies.reply}
                          </p>
                        </div>
                        <div className="btn-reply-comment">
                          <p
                            className="btn-reply"
                            onClick={() => handleReplyComment(item.id)}
                          >
                            {" "}
                            <MailOutlined className="mr-1" />
                            Trả lời
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {checkInputReply[item.id] && checkInputReply[item.id] == true && (
                <div className="row mt-3">
                  <div className="col-md-11 col-10  box-input-user-review ">
                    <TextArea
                      className="custom-text-area"
                      value={valueComment.reply}
                      onChange={handleCommentChange}
                      placeholder="Xin mời để lại câu hỏi, QuangBao sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"
                      autoSize={{ minRows: 2, maxRows: 3 }}
                    />
                  </div>
                  <div className="col-md-1  col-2 d-flex align-items-center">
                    <button
                      onClick={() => handleSubmitComment(item.id, valueComment)}
                      className="btn btn-primary w-100"
                    >
                      {" "}
                      Gửi
                      <SendOutlined className="ms-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductReviews;
