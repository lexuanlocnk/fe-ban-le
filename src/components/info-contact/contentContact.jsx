import ConsultingDepartment from "./consultingDepartment";

const ContentContact = ({}) => {
  const contactsOnlineShowroom = [
    { name: "Ms. Ly", email: "ly.huynh@chinhnhan.vn", phone: "0967633904" },
    {
      name: "Mr. Khang",
      email: "khang.tran@chinhnhan.vn",
      phone: "0565678779",
    },
    { name: "Mr. Lộc", email: "loc.dang@chinhnhan.vn", phone: "0335979789" },
    { name: "Ms. Minh", email: "minh.nguyen@chinhnhan.vn", phone: "036704291" },
  ];

  const contactsSMB = [
    { name: "Ms. Hằng", email: "hang.to@chinhnhan.vn", phone: "0358955089" },
    {
      name: "Mr. Hưng",
      email: "hung.nguyenquoc@chinhnhan.vn",
      phone: "0779494294",
    },
    { name: "Mr. Nam", email: "nam.tat@chinhnhan.vn", phone: "0938808816" },
    { name: "Mr. An", email: "an.nguyen@chinhnhan.vn", phone: "0938808831" },
    { name: "Mr. Huệ", email: "hue.duong@chinhnhan.vn", phone: "0933808835" },
  ];

  const contactsDuAn = [
    {
      name: "Ms. Trân",
      email: "tran.tranbao@chinhnhan.vn",
      phone: "0931808146",
    },
    {
      name: "Ms. Trâm",
      email: "tram.nguyen@chinhnhan.vn",
      phone: "0902429683",
    },
    { name: "Ms. Trang", email: "trang.ly@chinhnhan.vn", phone: "0938808960" },
    { name: "Ms. Trân", email: "tran.tran@chinhnhan.vn", phone: "0933808847" },
  ];

  const contactsCallCenter = [
    { name: "Ms. Phượng", email: "cskh@chinhnhan.vn", phone: "0933808837" },
  ];

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
        <ConsultingDepartment
          title="KD ONLINE/ SHOWROOM"
          contacts={contactsOnlineShowroom}
          bgColor="#ecf0f1"
        />
        <ConsultingDepartment
          title="KD SMB"
          contacts={contactsSMB}
          bgColor="#ecf0f1"
        />
        <ConsultingDepartment
          title="KD DỰ ÁN"
          contacts={contactsDuAn}
          bgColor="#ecf0f1"
        />
        <ConsultingDepartment
          title="CALL CENTER"
          contacts={contactsCallCenter}
          bgColor="#ecf0f1"
        />
      </div>
    </div>
  );
};

export default ContentContact;
