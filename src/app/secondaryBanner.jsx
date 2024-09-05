"use client";
import React, { useRef, useState } from "react";
import { hostImage } from "./lib/config";
// Import Swiper React components

// import required modules

const SecondaryBanner = ({ bannerMiddle }) => {
  return (
    <div className="row mx-2 ">
      {bannerMiddle &&
        bannerMiddle.length > 0 &&
        bannerMiddle.map((item, index) => (
          <div className="col-4 container_banner_secondary px-1" key={index}>
            <div className="box_banner_secondary">
              <img
                src={hostImage + item?.picture}
                className=" image_banner_secondary"
              />
            </div>
          </div>
        ))}
    </div>
  );
};
export default SecondaryBanner;
