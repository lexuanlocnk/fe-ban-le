"use client";

import { useState, useEffect, useRef } from "react";
import { Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
const CountdownTimer = ({ duration }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1000);
    }, 1000);
  }, [time]);

  const getFormattedTime = (milliseconds) => {
    let total_seconds = parseInt(Math.floor(milliseconds / 1000));
    let total_minutes = parseInt(Math.floor(total_seconds / 60));
    let total_hours = parseInt(Math.floor(total_minutes / 60));
    let days = parseInt(Math.floor(total_hours / 24));

    let seconds = parseInt(total_seconds % 60);
    let minutes = parseInt(total_minutes % 60);
    let hours = parseInt(total_hours % 24);

    return (
      <Tag
        color="red"
        icon={<ClockCircleOutlined style={{ fontSize: "16px" }} />}
        className="p-2"
      >
        <Tag color="red">
          <span className="text_countdown">{days}</span>{" "}
        </Tag>{" "}
        <Tag color="red">
          <span className="text_countdown">{hours}</span>
        </Tag>{" "}
        <Tag color="red">
          <span className="text_countdown">{minutes}</span>
        </Tag>
        <Tag color="red">
          <span className="text_countdown">{seconds}</span>
        </Tag>
      </Tag>
    );
  };

  return <div>{getFormattedTime(time)}</div>;
};
export default CountdownTimer;
