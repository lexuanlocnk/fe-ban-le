"use client";

import React, { useEffect } from "react";
import ThreeSixty from "react-360-view";

function ComponentImage3D({ slide }) {
  useEffect(() => {
    const container = document.getElementById("box_image_360");
    container.addEventListener("wheel", (event) => {
      event.stopPropagation();
    });
    return () => {
      container.removeEventListener("wheel", (event) => {
        event.stopPropagation();
      });
    };
  }, []);

  return (
    <div id="box_image_360">
      <ThreeSixty
        autoplay={24}
        disableZoom={true}
        amount={8}
        imagePath={slide?.src}
        fileName="civic-{index}.jpg"
        disableScrollZoom={true}
      />
    </div>
  );
}

export default ComponentImage3D;
