import ContentPay from "./contentPay";
import Header from "../header/header";
import Footer from "../../components/footer";
import "../../../public/css/cssPay.css";
import "../../../public/css/cssCart.css";
import { hostApi } from "../lib/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/nextAuth";

async function fetchDataOrder(orderId, orderIdCookie, userId) {
  if (!orderIdCookie) {
    redirect("/");
  }
  if (!orderIdCookie.includes(orderId)) {
    redirect("/");
  }

  try {
    const response = await fetch(
      `${hostApi}/member/infor-order/${orderId}${userId ? `/${userId}` : ""}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // console.log("test loi dum anh long ", data);
    if (data.status == false) {
      redirect("/");
    }
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

export default async function Page({ searchParams }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const cookieStore = cookies();
  const cookieIdOrder = cookieStore.get("key_list_order")?.value;
  const dataOrder = await fetchDataOrder(
    searchParams["orderId"],
    cookieIdOrder,
    userId
  );

  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentPay dataOrder={dataOrder} userId={userId} />
      <Footer />
    </div>
  );
}
