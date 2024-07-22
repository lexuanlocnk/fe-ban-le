"use client";

import Image from "next/image";
import { useState } from "react";
import { hostImage } from "../../lib/config";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

const GalleryImage = ({ imageMain, listImages }) => {
  const [imageProductMain, setImageProductMain] = useState({
    src: imageMain,
    index: -1,
    indexActive: 0,
  });

  const handleMouseThumbnails = (image, index) => {
    setImageProductMain({
      src: image.picture,
      indexActive: index,
    });
  };

  const handleLastImageClick = () => {
    setImageProductMain((prev) => ({
      ...prev,
      index: 0,
    }));
  };

  const handleImageClick = (inx) => {
    setImageProductMain((prev) => ({
      ...prev,
      index: inx,
    }));
  };

  return (
    <div className="container_gallery_image">
      <div className="container_image_main">
        <div className="box_image_main" onClick={() => handleImageClick(0)}>
          <Image
            src={hostImage + imageProductMain.src}
            alt="image_main"
            width={370}
            height={320}
            quality={100}
          />
        </div>
      </div>

      <div className="container_thumbnail">
        <div className="box_thumbnail">
          {listImages.slice(0, 6).map((image, index) => (
            <div
              onClick={() => handleImageClick(index)}
              key={index} // Each element in the list should have a unique key prop
              onMouseEnter={() => handleMouseThumbnails(image, index)}
              className={`${
                imageProductMain.indexActive === index ? "active_image" : ""
              } box_image_thumbnail`}
            >
              <Image
                quality={80}
                alt={hostImage + image.picture}
                width={50}
                height={50}
                src={hostImage + image.picture}
              />
            </div>
          ))}

          {listImages.length > 6 && (
            <div onClick={handleLastImageClick} className="box_image_last">
              <Image
                quality={80}
                width={50}
                height={50}
                src={hostImage + listImages[listImages.length - 1].picture}
              />

              <div className="bg_last_image">
                <span>+{listImages.length - 6}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Uncomment and configure Lightbox as needed */}
      <Lightbox
        className="container_lightbox_gallery"
        render={{
          buttonPrev: listImages.length <= 1 ? () => null : undefined,
          buttonNext: listImages.length <= 1 ? () => null : undefined,
        }}
        carousel={{ finite: listImages.length <= 1 }}
        close={() =>
          setImageProductMain((prev) => ({
            ...prev,
            index: -1,
          }))
        }
        slides={listImages.map((item, index) => ({
          src: hostImage + item.picture,
          index: index,
        }))}
        index={imageProductMain.index}
        open={imageProductMain.index >= 0}
        plugins={[Thumbnails]}
      />
    </div>
  );
};

export default GalleryImage;
