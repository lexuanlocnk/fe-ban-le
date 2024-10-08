"use client";
import { useState } from "react";
import { FaSquareFacebook, FaGooglePlus, FaPhone } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

// import LoginNumberPhone from "./loginNumberPhone";
// import NumberOTP from "./numberOPT";
import LoginAccount from "./loginAccount";
import RegisterAccount from "./registerAccount";

import ForgotPassword from "./forgotPassword";

import { signIn } from "next-auth/react";
import { UseAppContext } from "../lib/appProvider";

const Login = ({ statusLogin }) => {
  const [statusAccount, setStatusAccount] = useState(null);
  const { openNotificationWithIcon } = UseAppContext();

  return (
    <div className="container_page_login">
      <div className="box_content_login">
        <div className="content_login">
          <div className="title_login text-center">
            <span>
              Chào mừng bạn đến với QUANGBAO.VN - Nâng tầm trải nghiệm công nghệ
              của bạn với mỗi sản phẩm chính hãng từ laptop đến phụ kiện điện
              tử!
            </span>
          </div>

          {statusAccount && statusAccount === "register" ? (
            <RegisterAccount setStatusAccount={setStatusAccount} />
          ) : statusAccount === "forgotPassword" ? (
            <ForgotPassword setStatusAccount={setStatusAccount} />
          ) : (
            <div className="d-flex justify-content-center">
              <div className="ui_login_user">
                <div
                  onClick={() =>
                    signIn("facebook", {
                      redirect: true,
                      callbackUrl: window.location.origin,
                    })
                  }
                  className="box_func_login bg_login_fb"
                >
                  <FaSquareFacebook className="icon_func_login" />
                  <div className="title_login_func">
                    <span>Tiếp tục với Facebook</span>
                  </div>
                </div>

                <div
                  className="box_func_login bg_login_google"
                  onClick={() =>
                    signIn("google", {
                      redirect: true,
                      callbackUrl: window.location.origin,
                    })
                  }
                >
                  <FaGooglePlus className="icon_func_login" />
                  <div className="title_login_func">
                    <span>Tiếp tục với Google</span>
                  </div>
                </div>

                <div className="text_or">
                  <span>Hoặc</span>
                </div>

                <div
                  onClick={() => setStatusAccount("login")}
                  className="box_func_login bg_login_phone"
                >
                  <FaPhone className="icon_func_number_login" />
                  <div className="title_login_phone_func">
                    <span>Tiếp tục với tài khoản</span>
                  </div>
                </div>

                <div
                  onClick={() => setStatusAccount("register")}
                  className="box_func_login bg_login_phone"
                >
                  <FaUserEdit className="icon_func_number_login" />
                  <div className="title_login_phone_func">
                    <span>Đăng ký tài khoản</span>
                  </div>
                </div>

                <div
                  onClick={() => setStatusAccount("forgotPassword")}
                  className="text_or"
                >
                  <span>Quên mật khẩu?</span>
                </div>

                {statusAccount && statusAccount === "login" && <LoginAccount />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
