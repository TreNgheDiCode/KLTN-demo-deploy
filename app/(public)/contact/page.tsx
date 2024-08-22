import { ContactForm } from "@/components/contact/contact-form";
import { GetNameSchools } from "@/lib/nameSchools";
import { redirect } from "next/navigation";

const ContactUsPage = async () => {
  const schools = await GetNameSchools();

  if (!schools) {
    redirect("/");
  }

  return <ContactForm schools={schools} />;
};

export default ContactUsPage;
