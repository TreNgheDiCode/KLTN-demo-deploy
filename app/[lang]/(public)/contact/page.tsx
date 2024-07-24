import { ContactForm } from "@/components/contact/contact-form";
import { GetSchoolLib } from "@/lib/school";

const ContactUsPage = async () => {
  const schools = await GetSchoolLib();

  return (
    <div className="container flex h-full flex-col items-center gap-y-2 pt-4 text-primary">
      <h1 className="text-3xl font-bold text-main dark:text-primary">
        Liên Hệ
      </h1>
      <p className="text-center">
        Cần hỗ trợ? Hãy gửi cho chúng tôi một tin nhắn, mô tả vấn đề bạn đang
        gặp phải
        <br />
        đang trải nghiệm và chúng tôi sẽ phản hồi bạn sớm nhất có thể.
      </p>
      <ContactForm schools={schools} />
    </div>
  );
};

export default ContactUsPage;
