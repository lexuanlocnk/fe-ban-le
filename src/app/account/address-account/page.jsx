import "../../../../public/css/cssAccount.css";
import Header from "../../header/header";
import ContentAddress from "./contentAddress";
import Breadcrumb from "../../../components/breadcrumb";
import MenuAccount from "../menuAccount";
import Footer from "../../../components/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/nextAuth";
import { hostApi } from "../../lib/config";

export const metadata = {
  title: "Sổ địa chỉ",
  description: "Generated by Next.js",
};
async function fetchDataAddress(userId) {
  try {
    const response = await fetch(
      `${hostApi}/member/show-address-member/${userId}/all`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.address;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const page = async () => {
  const { user } = await getServerSession(authOptions);
  const dataAddress = await fetchDataAddress(user.id);

  const defaultMenuItem = {
    id: 5,
    name: "Sổ địa chỉ",
  };

  return (
    <div className="container-fluid px-0">
      <Header />

      <div className="box-container-content-account mb-3">
        <div className="in-box-container-content-account pt-2">
          <div className="row box-content-account mx-0">
            <div className="col-12 ">
              <Breadcrumb nameItem={defaultMenuItem.name} />
            </div>

            <MenuAccount defaultMenuItem={defaultMenuItem} />

            <ContentAddress dataAdd={dataAddress} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
