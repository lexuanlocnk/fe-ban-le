import Link from "next/link";
import { hostApi } from "../../lib/config";

async function fetchNewsCategory() {
  try {
    const response = await fetch(`${hostApi}/member/statistics-category`, {
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

const SuggestedProducts = async () => {
  const dataMostSearch = await fetchNewsCategory();

  return (
    <>
      {dataMostSearch &&
        dataMostSearch.map((item, index) => (
          <Link
            className="suggest-product"
            key={index}
            href={
              item?.type == "product"
                ? `/detail-product/${item?.url}`
                : `/category/${item?.url}`
            }
          >
            {item?.name}
          </Link> //
        ))}
    </>
  );
};

export default SuggestedProducts;
