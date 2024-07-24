import { getServerSession } from "next-auth";
import "../../../../../public/css/cssAccount.css";
import Header from "../../../header/header";
import { authOptions } from "../../../lib/nextAuth";
import ContentDetail from "./detailOrder";
import { hostApi } from "../../../lib/config";

async function fetchDetailOrder(userId, params) {
  try {
    const response = await fetch(
      `${hostApi}/member/detail-order/${params}/${userId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.dataOrder;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const dataDetailOrder = await fetchDetailOrder(
    session.user.id,
    params.idOrder
  );
  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentDetail dataDetailOrder={dataDetailOrder} />
    </div>
  );
};

export default page;
