"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NotFoundProduct = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      router.replace("/");
    }, 8500); // Chuyển hướng sau 10 giây

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <div className="container_not_found_product">
      <div className="title_text_not_found">
        <div className="box_icon_not_found_2">
          <Image
            width={150}
            height={150}
            alt="Not Found Product"
            src={"/image/img_not_found.png"}
          />
        </div>
        <div className="box_title_not_found">
          Trang không tồn tại. Bạn sẽ được đưa về trang chủ sau {countdown}s
        </div>
        <div
          className="back_home_not_found"
          onClick={() => router.replace("/")}
        >
          <span className="">Quay về trang chủ</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundProduct;
