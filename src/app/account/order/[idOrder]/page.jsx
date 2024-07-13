import "../../../../../public/css/cssAccount.css";
import Header from "../../../header/header";
import ContentDetail from "./detailOrder";
const page = () => {
  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentDetail />
    </div>
  );
};

export default page;
