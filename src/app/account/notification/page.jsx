import "../../../../public/css/cssAccount.css";
import Header from "../../header/header";
import ContentNotification from "./contentNotification";
const page = () => {
  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentNotification />
    </div>
  );
};

export default page;
