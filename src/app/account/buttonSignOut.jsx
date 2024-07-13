"use client";
import { signOut } from "next-auth/react";

const ButtonSignOut = ({ item }) => {
  return (
    <span
      className="cursor-pointer"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <div className={`item-menu-account`}>
        <div className="icon_menu_account">{item.icon}</div>
        <span>{item.name}</span>
      </div>
    </span>
  );
};

export default ButtonSignOut;
