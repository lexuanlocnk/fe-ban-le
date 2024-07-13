import dayjs from "dayjs";
import { hostImage } from "./config";

const loader = ({ src }) => {
  return `${hostImage + src}`;
};

const scrollToElement = (element) => {
  setTimeout(() => {
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, 0);
};

const calculateTimeDifference = (timestamp) => {
  const now = dayjs();
  const pastDate = dayjs.unix(timestamp);

  const diffInMinutes = now.diff(pastDate, "minute");
  const diffInHours = now.diff(pastDate, "hour");
  const diffInDays = now.diff(pastDate, "day");

  if (diffInDays >= 1) {
    return `${diffInDays} ngày trước`;
  } else if (diffInHours >= 1) {
    return `${diffInHours} giờ trước`;
  } else {
    return `${diffInMinutes} phút trước`;
  }
};

export { loader, scrollToElement, calculateTimeDifference };
