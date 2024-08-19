import ContactCard from "./contactCard";

const ContactSection = ({ title, contacts, bgColor }) => (
  <section className="contact-section" style={{ backgroundColor: bgColor }}>
    <div className="text-center">
      <span className="title_section">{title}</span>
    </div>
    {contacts.map((contact, index) => (
      <ContactCard
        key={index}
        name={contact.title}
        email={contact.email}
        phone={contact.phone}
        // skype={contact.skype}
      />
    ))}
  </section>
);

export default ContactSection;
