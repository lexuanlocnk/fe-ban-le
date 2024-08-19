import { hostApi } from "../../app/lib/config";
import ConsultingDepartment from "./consultingDepartment";

async function fetchDataContact() {
  try {
    const response = await fetch(`${hostApi}/show-all-support`, {
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

const ContentContact = async ({}) => {
  const dataContact = await fetchDataContact();

  return (
    <div className="container_contact_header">
      <div>
        <div className="title_support text-center">
          <span>Hỗ Trợ Tư Vấn</span>
        </div>
        <div className="time_working text-center">
          <span>
            Thời gian làm việc: Tất cả các ngày trong tuần từ thứ 2 đến thứ 7,
            từ 8h30 - 17h30
          </span>
        </div>
      </div>

      <div className="box_info_counselor">
        {dataContact &&
          Object.keys(dataContact).length > 0 &&
          Object.entries(dataContact).map(([key, value]) => (
            <ConsultingDepartment
              key={key}
              title={key}
              contacts={value}
              bgColor="#ecf0f1"
            />
          ))}
      </div>
    </div>
  );
};

export default ContentContact;
