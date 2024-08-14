import "../../../../public/css/cssCategory.css";
import "../../../../public/css/cssContentHomePage.css";
import Header from "../../header/header";
import Footer from "../../../components/footer";
import { redirect } from "next/navigation";
import ContentCategory from "../[nameCategory]/contentCategory";
import { hostApi } from "../../lib/config";
import FilterProducts from "./filterProducts";

async function fetchDataProperties(slug) {
  try {
    const response = await fetch(
      `${hostApi}/member/category-option?categoryUrl=${slug}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.status == false || data.message == "notFoundCategory") {
      redirect("/");
    }

    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    redirect("/");
  }
}

async function fetchDataProducts(slug, valuePage, dataParams) {
  try {
    const queryParams = new URLSearchParams({
      catUrl: slug,
      page: valuePage ?? 1,
      ...dataParams,
    });

    const response = await fetch(
      `${hostApi}/member/filter-category?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

export async function generateMetadata({ params }) {
  // read route params

  // fetch data
  const data = await fetch(
    `${hostApi}/member/get-name-category?categoryUrl=${params.nameCategory}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  return {
    title: "DANH MỤC " + data.catName.toUpperCase(),
    // openGraph: {
    //   title: 'Blog',
    // },
  };
}

export default async function Page({ params, searchParams }) {
  const page = searchParams["page"];
  const dataProperties = await fetchDataProperties(params.nameCategory);
  const dataProducts = await fetchDataProducts(
    params.nameCategory,
    page,
    searchParams
  );

  return (
    <div className="container-fluid px-0">
      <Header />
      <ContentCategory
        dataProducts={dataProducts}
        searchParams={searchParams}
        dataProperties={dataProperties}
        page={page}
      />
      <Footer />
    </div>
  );
}
