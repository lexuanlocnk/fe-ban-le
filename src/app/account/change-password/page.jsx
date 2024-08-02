import "../../../../public/css/cssAccount.css";
import Header from "../../header/header";
import ContentChangePassword from "./contentChangePassword";
import Breadcrumb from "../../../components/breadcrumb";
import MenuAccount from "../menuAccount";
const page = () => {
  const defaultMenuItem = {
    id: 2,
    name: "Đổi mật khẩu",
  };

  return (
    <div className="container-fluid px-0">
      <Header />

      <div className="box-container-content-account">
        <div className="in-box-container-content-account pt-2">
          <div className="row box-content-account mx-0">
            <div className="col-12 ">
              <Breadcrumb nameItem={defaultMenuItem.name} />
            </div>

            <MenuAccount defaultMenuItem={defaultMenuItem} />
            <ContentChangePassword nameItem={defaultMenuItem.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
