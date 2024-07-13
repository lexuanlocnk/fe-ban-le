import Header from "../header/header";
import Footer from "../../components/footer";
import BuildConfiguration from "./buildConfiguration";
import "../../../public/css/cssBuildConfiguration.css";
import { hostApi } from "../lib/config";

async function fetchDataBuildPc() {
  try {
    const response = await fetch(`${hostApi}/member/build-pc`, {
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

export default async function Home() {
  const dataBuildPc = await fetchDataBuildPc();

  return (
    <div className="container-fluid px-0">
      <Header />
      <BuildConfiguration dataBuildPc={dataBuildPc} />
      <Footer />
    </div>
  );
}
