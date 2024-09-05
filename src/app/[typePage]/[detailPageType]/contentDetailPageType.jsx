import { hostApi } from "../../lib/config";

async function fetchDataDetailPageType(url) {
  console.log(`${hostApi}/member/detail-service/${url}`);

  try {
    const response = await fetch(`${hostApi}/member/detail-service/${url}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.service;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const ContentDetailPageType = async ({ url }) => {
  const dataService = await fetchDataDetailPageType(url);

  return <div></div>;
};

export default ContentDetailPageType;
