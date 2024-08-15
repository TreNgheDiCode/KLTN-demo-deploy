import { ContactForm } from "@/components/contact/contact-form";
import { GetSchoolLib } from "@/lib/school";
import { redirect } from "next/navigation";

const ContactUsPage = async () => {
  const schools = await GetSchoolLib();

  if (!schools) {
    redirect("/");
  }

  return <ContactForm schools={schools.data} />;
};

export default ContactUsPage;
