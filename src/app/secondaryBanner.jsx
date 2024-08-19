"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components

// import required modules

const SecondaryBanner = () => {
  const [imageBanner, setImageBanner] = useState([
    { url: "/image/banner_small2.png" },
    { url: "/image/banner_small3.png" },
    { url: "/image/banner_small.png" },
  ]);

  return (
    <div className="row mx-2 ">
      {imageBanner &&
        imageBanner.length > 0 &&
        imageBanner.map((item, index) => (
          <div className="col-4 container_banner_secondary px-1" key={index}>
            <div className="box_banner_secondary">
              <img src={item.url} className=" image_banner_secondary" />
            </div>
          </div>
        ))}
    </div>
  );
};
export default SecondaryBanner;
