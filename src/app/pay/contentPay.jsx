import ProductPayment from "./productPayment";

const ContentPay = ({ dataOrder, userId }) => {
  return (
    <div className="box-container-content-pay  ">
      <div className="in-box-container-content-pay pt-2 pb-3">
        <div className="row box-content-pay mx-0">
          <div className="col-12 col-lg-12 d-flex justify-content-center">
            <ProductPayment userId={userId} dataOrder={dataOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPay;
