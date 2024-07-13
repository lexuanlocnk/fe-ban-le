"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { hostApi } from "../lib/config";

export async function navigate(url) {
  redirect(url);
}

export const handleOrder = async (values, status, total, data, orderPoints) => {
  try {
    const response = await fetch(`${hostApi}/member/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: values,
        total: total,
        userId: status === "unauthenticated" ? "" : data.user.id,
        orderPoints: orderPoints,
      }),
    });

    const dataRes = await response.json();

    if (dataRes?.status) {
      const currentCookies = cookies();
      let prevOrderList = [];

      const keyListOrder = currentCookies.get("key_list_order")?.value;

      if (keyListOrder && keyListOrder.length > 0) {
        try {
          prevOrderList = JSON.parse(keyListOrder);
        } catch (e) {
          console.error("Error parsing JSON from cookies:", e);
          prevOrderList = [];
        }
      }

      const updatedOrderList = [...prevOrderList, dataRes.orderId];

      currentCookies.set("key_list_order", JSON.stringify(updatedOrderList), {
        path: "/",
        maxAge: 86400,
      });
    }

    return dataRes;
  } catch (error) {
    console.error("Err:", error);
  }
};
