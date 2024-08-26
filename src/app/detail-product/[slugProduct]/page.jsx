import { getServerSession } from "next-auth";
import "../../../../public/css/detail-product.css";
import Footer from "../../../components/footer";
import Header from "../../header/header";
import { hostApi } from "../../lib/config";
import { authOptions } from "../../lib/nextAuth";
import ContentDetailProduct from "./contentDetailProduct";
export async function generateMetadata({ params }) {
  // read route params

  // fetch data
  const product = await fetch(
    `${hostApi}/member/get-name-product?productSlug=${params.slugProduct}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  return {
    title: product?.productName,
    description: product?.description,
  };
}

async function fetchDataDetailProduct(params, userId) {
  try {
    const response = await fetch(
      `${hostApi}/member/product-detail/${params}?userId=${userId ?? null}`,
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

async function fetchDataProductsCompare(params) {
  try {
    const response = await fetch(
      `${hostApi}/member/relate-product-technology?key=${params}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.Technology;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

async function fetchDataProductsRelated(params) {
  try {
    const response = await fetch(
      `${hostApi}/member/relate-product?key=${params}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.relatedProduct;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const HomePage = async ({ params }) => {
  const session = await getServerSession(authOptions);

  const fetchDataProduct = fetchDataDetailProduct(
    params.slugProduct,
    session?.user?.id
  );
  const fetchProductsCompare = fetchDataProductsCompare(params.slugProduct);
  const fetchDataRelated = fetchDataProductsRelated(params.slugProduct);
  const [dataProduct, dataProductsCompare, dataRelated] = await Promise.all([
    fetchDataProduct,
    fetchProductsCompare,
    fetchDataRelated,
  ]);

  return (
    <div className="container-fluid px-0">
      <Header />

      <ContentDetailProduct
        breadcrumbData={dataProduct?.breadcrumb}
        dataRelated={dataRelated}
        dataProductsCompare={dataProductsCompare}
        dataGiftProduct={dataProduct}
        dataProduct={dataProduct?.productDetail}
        comments={dataProduct?.commentProductId}
        params={params.slugProduct}
      />

      <Footer />
    </div>
  );
};

export default HomePage;
