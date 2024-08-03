import { ContactForm } from "@/components/contact/contact-form";
import { GetSchoolLib } from "@/lib/school";

const ContactUsPage = async () => {
  const schools = await GetSchoolLib();

  return <ContactForm schools={schools} />;
};

export default ContactUsPage;
