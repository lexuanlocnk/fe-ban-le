import Image from "next/image";

const BannerPromotion = ({}) => {
  return (
    <div className="container_image_promotion">
      <Image
        quality={100}
        height={0}
        width={0}
        sizes="100vw"
        alt="bannerPromotion"
        src={"/image/bannerPromotion.jpg"}
      />
    </div>
  );
};
export default BannerPromotion;
