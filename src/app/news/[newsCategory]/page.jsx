import Header from "../../header/header";
import ContentCategoryNews from "./contentNewsCategory";
import Footer from "../../../components/footer";
import "../../../../public/css/cssNewsCategory.css";

const HomePage = ({ searchParams }) => {
  const page = searchParams["page"] ?? "1";

  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentCategoryNews page={page} />
      <Footer />
    </div>
  );
};

export default HomePage;
