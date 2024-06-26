import { ContactForm } from "@/components/contact/contact-form";
import { GetSchoolLib } from "@/lib/school";

const ContactUsPage = async () => {
  const schools = await GetSchoolLib();

  return (
    <div className="container flex h-full flex-col items-center gap-y-2 pt-4 text-primary">
      <h1 className="text-main text-3xl font-bold dark:text-primary">
        Contact Us
      </h1>
      <p className="text-center">
        Need assistance? Drop us a message, describing the problem you're
        <br />
        experiencing, and we'll get back to you as soon as possible.
      </p>
      <ContactForm schools={schools} />
    </div>
  );
};

export default ContactUsPage;
