import { Button, Input } from "antd";
import { signIn } from "next-auth/react";

const NumberOTP = ({ numberPhone, setOtp, otp, confirmationResult }) => {
  const handleVerifyOtp = async () => {
    try {
      // await confirmationResult.confirm(otp);
      const res = await signIn("credentials", {
        numberPhone,
        otp,
        callbackUrl: window.location.origin,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="box_otp">
      <div className="text_or">
        <span>
          Vui lòng nhập số OTP đã được gửi về số điện thoại {numberPhone} để
          thực hiện đăng nhập
        </span>
      </div>
      <div className="otp_number">
        <Input.OTP
          onChange={(text) => setOtp(text)}
          formatter={(str) => (/^\d+$/.test(str) ? str : "")}
        />
      </div>

      <div className="btn_send_number_phone  d-flex justify-content-center mt-2">
        <Button onClick={handleVerifyOtp} type="primary">
          Xác nhận
        </Button>
      </div>
    </div>
  );
};

export default NumberOTP;
