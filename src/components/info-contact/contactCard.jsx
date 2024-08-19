import Image from "next/image";
import React from "react";

const ContactCard = ({ name, email, phone }) => (
  <div className="contact-card">
    <span className="name_staff">{name}</span>
    <a href={`mailto:${email}`}>
      <Image
        src="/image/image-card-contact/gmail.png"
        width={25}
        height={25}
        alt="gmail"
      />{" "}
      {email}
    </a>
    <a href={`tel:+${phone}`}>
      <Image
        src="/image/image-card-contact/telephone.png"
        width={25}
        height={25}
        alt="Số điện thoại"
      />{" "}
      {phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3")}
    </a>

    <a
      rel="nofollow"
      title="Tư vấn Zalo"
      href={`https://zalo.me/${phone}`}
      target="_blank"
    >
      <Image
        src="/image/image-card-contact/zalo-logo.png"
        width={25}
        height={25}
        alt="Số điện thoại"
      />{" "}
      Tư vấn Zalo: {phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3")}
    </a>
  </div>
);

export default ContactCard;
