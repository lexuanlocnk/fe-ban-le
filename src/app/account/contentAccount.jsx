import MenuAccount from "./menuAccount";
import InfoAccount from "./infoAccount";
import Breadcrumb from "../../components/breadcrumb";

const ContentAccount = () => {
  const defaultMenuItem = {
    id: 1,
    name: "Thông tin cá nhân",
  };

  return (
    <div className="box-container-content-account">
      <div className="in-box-container-content-account pt-1">
        <div className="row box-content-account mx-0">
          <div className="col-12 ">
            <Breadcrumb nameItem={defaultMenuItem.name} />
          </div>

          <MenuAccount defaultMenuItem={defaultMenuItem} />
          <div className="col-9  mt-2">
            <InfoAccount />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentAccount;
