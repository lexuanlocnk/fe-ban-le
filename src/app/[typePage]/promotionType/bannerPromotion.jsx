import Image from "next/image";
import { hostImage } from "../../lib/config";

const BannerPromotion = ({ dataBanner }) => {
  return (
    <div className="container_image_promotion">
      <Image
        quality={100}
        height={0}
        width={0}
        sizes="100vw"
        alt="bannerPromotion"
        src={hostImage + dataBanner[0]?.picture}
      />
    </div>
  );
};
export default BannerPromotion;
