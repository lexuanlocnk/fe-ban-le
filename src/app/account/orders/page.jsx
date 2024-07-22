import React from "react";
import Header from "../../header/header";
import "../../../../public/css/cssAccount.css";
import ContentOrderManagement from "./contentOrderManagement";
import Footer from "../../../components/footer";
import { hostApi } from "../../lib/config";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/nextAuth";

async function fetchStatusOrder() {
  try {
    const response = await fetch(`${hostApi}/member/show-order-status`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

async function fetchDataOrders(userId, params) {
  try {
    const response = await fetch(
      `${hostApi}/member/show-order?userId=${userId}&key=${params}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}
const page = async ({ searchParams }) => {
  const activeStatusOrder = searchParams["statusOrder"] ?? "pending";
  const session = await getServerSession(authOptions);

  const [dataStatus, dataOrder] = await Promise.all([
    fetchStatusOrder(),
    fetchDataOrders(session.user.id, activeStatusOrder),
  ]);

  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentOrderManagement
        activeStatusOrder={activeStatusOrder}
        dataStatusOrder={dataStatus}
        dataOrder={dataOrder}
      />
      <Footer />
    </div>
  );
};

export default page;
