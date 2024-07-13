import "../../../../public/css/cssAccount.css";
import Header from "../../header/header";
import ContentChangePassword from "./contentChangePassword";
const page = () => {
  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentChangePassword />
    </div>
  );
};

export default page;
