import ComponentNumberPhone from "../../components/componentNumberPhone";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const LoginNumberPhone = ({
  setCheckOTP,
  numberPhone,
  setNumberPhone,
  setError,
  error,
}) => {
  const submitNumberPhone = async () => {
    setCheckOTP(true);
  };

  return (
    <>
      <div className="text_or">
        <span>
          Sử dụng số điện thoại để Đăng nhập hoặc Đăng ký tài khoản của bạn
        </span>
      </div>

      <div className="  w-100  ">
        <ComponentNumberPhone
          numberPhone={numberPhone}
          setNumberPhone={setNumberPhone}
          size={"large"}
          setError={setError}
        />

        <div className="text_error ">
          {error && error.error == true && <span>{error.description}</span>}
        </div>

        {error && error.error == true ? (
          <div className="   d-flex justify-content-center">
            <Button icon={<SendOutlined />} type="primary" disabled>
              Gửi
            </Button>
          </div>
        ) : (
          <div className="btn_send_number_phone  d-flex justify-content-center">
            <Button
              onClick={submitNumberPhone}
              icon={<SendOutlined />}
              type="primary"
            >
              Gửi
            </Button>
          </div>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </>
  );
};

export default LoginNumberPhone;
