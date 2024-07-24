import Information from "@/components/about/infomation";
import Image from "next/image";

const About = async () => {
  const people = [
    {
      name: "Phan Thị Ngọc Hân",
      title: "Tổng giám đốc / Thành viên HĐQT/Đại diện pháp lý cty",
      phone: "(+84) 984122837",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Liêu Tuấn Đức",
      title: "Phó Tổng giám đốc / Thành viên hội đồng quản trị",
      phone: "(+84) 914008545",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Trương Thiện Tùng ",
      title: "Phó Tổng giám đốc / Thành viên hội đồng quản trị",
      phone: "(+84) 914008545",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Trần Chánh Huy",
      title: "Thành viên hội đồng quản trị",
      phone: "(+84) 981861057",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Lưu Tường Bách",
      title: "Thành viên hội đồng quản trị",
      phone: "(+84) 91 3770088",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Liêu Vũ Uyên Chi",
      title: "Trưởng phòng Marketing ",
      phone: "(+84) 764130709",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Lưu Tường Giai ",
      title: "Phó Chủ Tịch hội đồng quản trị",
      phone: "(+84) 91 3907517",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 flex justify-center sm:justify-start">
          <Image
            width={120}
            height={120}
            src={"/logo.png"}
            alt="logo"
            className="h-24 w-24 sm:h-32 sm:w-32"
          />
        </div>
        <h1 className="mt-8 text-center text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
          Giới thiệu về công ty CEMC CO., LTD
        </h1>
        <div className="mt-10 space-y-2 text-lg font-bold text-primary sm:text-xl md:text-2xl">
          <div>
            Công ty TNHH Tư vấn giáo dục và y tế Canada (CANADA MEDICAL AND
            EDUCATION CONSULTING COMPANY LIMITED) , viết tắt CEMC CO., LTD
          </div>
          <div>Mã số thuế: 0317892172</div>
          <div>
            Địa chỉ trụ sở: 25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí
            Minh Việt Nam
          </div>
          <div>Điện thoại: 0984122837</div>
          <div>Email: Services@mecltd.edu.vn</div>
          <div>Facebook : https://www.facebook.com/mecltd.edu/</div>
        </div>
        <p className="mt-8 text-base font-medium leading-7 text-primary sm:text-lg">
          Công ty TNHH tư vấn giáo dục và y tế Canada (CEMC CO.,LTD) là một tổ
          chức chuyên về dịch vụ tư vấn du học Canada theo chương trình Co.op và
          hỗ trợ các nhà đầu tư về các dự án y tế. Về dịch vụ tư vấn du học ,
          công ty cung cấp thông tin và hỗ trợ sinh viên trong quá trình tìm
          kiếm các chương trình du học, đăng ký nhập học, xử lý thủ tục visa,
          tìm kiếm chỗ ở, và cung cấp hỗ trợ về cuộc sống và học tập sau khi
          sinh viên đã đến Canada. Chúng tôi có một đội ngũ nhân viên giàu kinh
          nghiệm và kiến thức về các chương trình học tập ở Canada. Và chúng tôi
          sẵn sàng cung cấp tư vấn cá nhân hóa cho từng sinh viên, giúp các bạn
          tìm kiếm chương trình phù hợp với mục tiêu học tập và sự phù hợp cá
          nhân. Công ty đã thiết lập mối quan hệ với các trường đại học, cao
          đẳng, và tổ chức giáo dục ở Canada để đảm bảo rằng sinh viên được
          hướng dẫn và hỗ trợ trong suốt quá trình du học. Công ty có thể giúp
          sinh viên đăng ký các khóa học, chuẩn bị hồ sơ nhập học, và tìm kiếm
          các cơ hội việc làm để hỗ trợ tài chính trong quá trình du học.
        </p>
        <h2 className="mt-10 text-xl font-bold text-primary">
          Danh sách thành viên điều hành công ty :
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {people.map((p, index) => (
          <div key={index}>
            <Information
              name={p.name}
              title={p.title}
              phone={p.phone}
              email={p.email}
              address={p.address}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
