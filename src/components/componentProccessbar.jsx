"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Progressbar({ soldQuantity }) {
  const [filled, setFilled] = useState(soldQuantity);

  return (
    <div className="box_progressbar position-relative">
      <div className="progressbar">
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#df2525",
            transition: "width 0.5s",
          }}
        ></div>
        <span className="progressPercent">Đã bán {filled}</span>
      </div>
      <Image
        quality={75}
        height={40}
        width={40}
        sizes="100vw"
        src="/image/fire.png"
        className="fire_proccess_bar"
        alt="fire"
      />
    </div>
  );
}
