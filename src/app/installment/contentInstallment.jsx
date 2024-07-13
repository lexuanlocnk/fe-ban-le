import InfoContentInstallment from "./infoContentInstallment";
import InfoClientInstallment from "./infoClientInstallment";

const ContentInstallment = () => {
  return (
    <div className="  box-container-content-installment  ">
      <div className="in-box-container-content-installment pt-2 pb-3">
        <div className="row box-content-installment  mx-0">
          <div className="col-12 col-lg-12 d-flex align-items-center  flex-column justify-content-center">
            <InfoContentInstallment />
            <InfoClientInstallment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentInstallment;
