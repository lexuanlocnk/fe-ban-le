"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  EmailIcon,
} from "react-share";
const BtnShareProduct = () => {
  const [isSent, setIsSent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = "https://vitinhnguyenkim.vn/";

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setIsSent(false);
  };

  const handleShareButtonClick = () => {
    setIsOpen(!isOpen);
    setIsSent(true);
    setTimeout(function () {
      setIsSent(false);
    }, 1000);
  };

  return (
    <div className="content_btn_share_product">
      <button
        className={`shareButton main ${isOpen ? "open" : ""}`}
        onClick={handleButtonClick}
      >
        {isOpen ? (
          <Image
            quality={75}
            height={0}
            width={0}
            sizes="100vw"
            src="/image/cross.png"
            className="img_icon_share"
            alt="img_icon_share"
          />
        ) : isSent ? (
          <Image
            src="/image/check.png"
            alt="img_icon_share"
            className="img_icon_share"
          />
        ) : (
          <Image
            quality={75}
            height={0}
            width={0}
            sizes="100vw"
            src="/image/share.png"
            className="img_icon_share"
            alt="img_icon_share"
          />
        )}
      </button>

      <button
        className={`shareButton fb ${isOpen ? "open" : ""}`}
        onClick={handleShareButtonClick}
      >
        <FacebookShareButton
          url={shareUrl}
          quote={"QuangBao website bán lẻ hàng đầu Việt Nam"}
          hashtag={"#quangbao_website_ban_le_hang_dau_Viet_Name"}
        >
          <Image
            quality={75}
            height={0}
            width={0}
            sizes="100vw"
            src="/image/facebook.png"
            className="img_icon_share"
            alt="img_icon_share"
          />
        </FacebookShareButton>
      </button>

      <button
        className={`shareButton tw ${isOpen ? "open" : ""}`}
        onClick={handleShareButtonClick}
      >
        <TwitterShareButton
          url={shareUrl}
          quote={"QuangBao website bán lẻ hàng đầu Việt Nam"}
          hashtag={"#quangbao_website_ban_le_hang_dau_Viet_Name"}
        >
          <Image
            quality={75}
            height={0}
            width={0}
            sizes="100vw"
            src="/image/twitter.png"
            className="img_icon_share"
            alt="img_icon_share"
          />
        </TwitterShareButton>
      </button>

      <button
        className={`shareButton ig ${isOpen ? "open" : ""}`}
        onClick={handleShareButtonClick}
      >
        {/* <FacebookMessengerShareButton url={shareUrl} appId="813598930579446">
          <Image src="messenger.png" className="img_icon_share" />
        </FacebookMessengerShareButton> */}

        <EmailShareButton
          url={shareUrl}
          quote={"QuangBao website bán lẻ hàng đầu Việt Nam"}
          subject={"QuangBao website bán lẻ hàng đầu Việt Nam"}
        >
          <Image
            quality={75}
            height={0}
            width={0}
            sizes="100vw"
            src="/image/gmail.png"
            className="img_icon_share"
            alt="img_icon_share"
          />
        </EmailShareButton>
      </button>
    </div>
  );
};

export default BtnShareProduct;
