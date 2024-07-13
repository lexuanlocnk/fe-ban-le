"use client";
import { UseAppContext } from "../lib/appProvider";

const InfoUserUpdate = ({ user }) => {
  const { infoUpdate } = UseAppContext();

  return (
    <div className="box_name_account">
      {infoUpdate && infoUpdate.length !== 0 ? (
        <>
          <span className="name_acc text_genaral_one_line">
            {infoUpdate.full_name ? infoUpdate.full_name : infoUpdate.email}
          </span>

          <span className="d-block">
            {infoUpdate.phone && infoUpdate.phone !== "NULL"
              ? infoUpdate.phone
              : "Chưa cập nhật số điện thoại"}
          </span>
        </>
      ) : (
        <>
          <span className="name_acc text_genaral_one_line">
            {user.full_name ? user.full_name : user.email}
          </span>

          <span className="d-block">
            {user.phone && user.phone !== "NULL"
              ? user.phone
              : "Chưa cập nhật số điện thoại"}
          </span>
        </>
      )}
    </div>
  );
};

export default InfoUserUpdate;
