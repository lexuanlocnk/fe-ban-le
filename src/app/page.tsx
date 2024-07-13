import "../../public/css/detail-product.css";
import ContentHomePage from "./contentHomePage";
import "../../public/css/cssContentHomePage.css";
import Header from "./header/header";
import Footer from "../components/footer";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentHomePage searchParams={searchParams} />
      <Footer />
    </div>
  );
}
