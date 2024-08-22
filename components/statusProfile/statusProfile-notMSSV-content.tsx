import { StudentEmail, StudentLib } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { format, parse } from "date-fns";
import { vi } from "date-fns/locale";

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}
interface InfoItemProps {
  label: string;
  value: string;
}

const StatusProfileContent = ({ account }: { account: StudentEmail }) => {
  const translateValue = (value: string) => {
    const translations: { [key: string]: string } = {
      STUDYING: "Đang học",
      DROPPED: "Đã bỏ học",
      AWAITING: "Đang chờ",
      APPROVED: "Đã được chấp nhận",
      HIGHSCHOOL: "Trung học phổ thông",
      UNIVERSITY: "Đại học",
      MALE: "Nam",
      FEMALE: "Nữ",
    };

    return translations[value] || value;
  };

  const formatDate = (date: Date) => {
    if (!date) return "Không có thông tin";
    try {
      return format(date, "dd MMMM, yyyy", { locale: vi });
    } catch (error) {
      return "Không có thông tin";
    }
  };

  return (
    <div className="mx-auto mt-2 max-w-4xl overflow-hidden rounded-lg shadow-lg shadow-black dark:shadow-white">
      <div className="p-6 text-black dark:text-primary">
        <div className="mb-6 text-center text-3xl font-bold">
          Trạng Thái:{" "}
          <span className="text-red-800">
            {translateValue(account.student.status)}
          </span>
        </div>

        <div className="relative mb-6 h-64">
          <Image
            src={account.student.cover || "/black.jpg"}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <Image
            src={account.image || "/avatar.jpg"}
            alt="avatar"
            width={100}
            height={100}
            className="absolute bottom-[-40px] left-1/2 h-40 w-40 -translate-x-1/2 transform rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* Information Sections */}
        <div className="grid gap-6 text-black dark:text-primary md:grid-cols-2">
          <InfoSection title="Thông Tin Cá Nhân">
            <InfoItem label="Mã Học sinh" value={"Chưa có mã sinh viên"} />
            <InfoItem
              label="Họ và tên"
              value={account.name || "Không có thông tin"}
            />
            <InfoItem
              label="Giới tính"
              value={translateValue(account.gender) || "Không có thông tin"}
            />
            <InfoItem label="Ngày sinh" value={formatDate(account.dob)} />
            <InfoItem
              label="CCCD"
              value={account.idCardNumber || "Không có thông tin"}
            />
            <InfoItem
              label="Email"
              value={account.email || "không có thông tin"}
            />
            <InfoItem
              label="Địa chỉ"
              value={account.address || "Không có thông tin"}
            />
          </InfoSection>

          {/* Educational Information */}
          <InfoSection title="Thông Tin Đào Tạo">
            <InfoItem label="Trường học" value={account.name} />
            <InfoItem
              label="Ngành đào tạo"
              value={
                account.student.school.programs[0].name || "Không có thông tin"
              }
            />
            <InfoItem label="Cơ sở" value="Không có thông tin" />
            <InfoItem label="Địa chỉ cơ sở chính" value="Không có thông tin" />
            <InfoItem
              label="Điểm trung bình tích lũy"
              value={
                account.student.gradeScore?.toString() || "Không có thông tin"
              }
            />
            <InfoItem
              label="Chứng chỉ ngoại ngữ"
              value={account.student.certificateType || "Không có thông tin"}
            />
            <InfoItem
              label="Trình độ học tập"
              value={
                translateValue(account.student.degreeType) ||
                "Không có thông tin"
              }
            />
          </InfoSection>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-xl font-semibold">Thông tin bổ sung:</h3>
          <Textarea
            value="Không có thông tin bổ sung gì"
            disabled
            className="w-full rounded-md border-0 bg-white bg-opacity-20 text-black placeholder-gray-300 dark:text-primary"
          />
        </div>
      </div>
    </div>
  );
};

const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => (
  <div className="mb-4 rounded-lg bg-white bg-opacity-10 p-4">
    <h2 className="mb-3 text-xl font-bold">{title}</h2>
    {children}
  </div>
);

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="mb-2">
    <span className="font-semibold">{label}:</span>{" "}
    <span className="text-primary">{value}</span>
  </div>
);

export default StatusProfileContent;
