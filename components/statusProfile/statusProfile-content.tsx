import { StudentLib } from "@/types";
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
const StatusProfileContent = ({ student }: { student: StudentLib }) => {
  const formatDate = (date: Date) => {
    if (!date) return "Không có thông tin";
    try {
      return format(date, "dd MMMM, yyyy", { locale: vi });
    } catch (error) {
      return "Không có thông tin";
    }
  };

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl">
      <div className="p-6 text-white">
        <div className="mb-6 text-center text-3xl font-bold">
          Trạng Thái: <span className="text-yellow-300">{student.status}</span>
        </div>

        {/* Avatar and Background */}
        <div className="relative mb-6 h-64">
          <Image
            src={student.cover || "undefined"}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
            <Image
              src={student.account.image || ""}
              alt="Avatar"
              width={150}
              height={150}
              className="rounded-full border-1 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Information Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <InfoSection title="Thông Tin Cá Nhân">
            <InfoItem
              label="Mã Học sinh"
              value={student.studentCode || "Không có thông tin"}
            />
            <InfoItem
              label="Họ và tên"
              value={student.account.name || "Không có thông tin"}
            />
            <InfoItem
              label="Giới tính"
              value={student.account.gender || "Không có thông tin"}
            />
            <InfoItem
              label="Ngày sinh"
              value={formatDate(student.account.dob)}
            />
            <InfoItem
              label="CCCD"
              value={student.account.idCardNumber || "Không có thông tin"}
            />
            <InfoItem
              label="Email"
              value={student.account.email || "không có thông tin"}
            />
            <InfoItem
              label="Địa chỉ"
              value={student.account.address || "Không có thông tin"}
            />
          </InfoSection>

          {/* Educational Information */}
          <InfoSection title="Thông Tin Đào Tạo">
            <InfoItem label="Trường học" value={student.school.name} />
            <InfoItem
              label="Ngành đào tạo"
              value={student.school.programs[0].name || "Không có thông tin"}
            />
            <InfoItem label="Cơ sở" value="Không có thông tin" />
            <InfoItem label="Địa chỉ cơ sở chính" value="Không có thông tin" />
            <InfoItem
              label="Điểm trung bình tích lũy"
              value={student.gradeScore.toString() || "Không có thông tin"}
            />
            <InfoItem
              label="Chứng chỉ ngoại ngữ"
              value={student.certificateType || "Không có thông tin"}
            />
            <InfoItem
              label="Trình độ học tập"
              value={student.degreeType || "Không có thông tin"}
            />
          </InfoSection>
        </div>

        {/* Additional Information */}
        <div className="mt-6">
          <h3 className="mb-2 text-xl font-semibold">Thông tin bổ sung:</h3>
          <Textarea
            value="Không có thông tin bổ sung gì"
            disabled
            className="w-full rounded-md border-0 bg-white bg-opacity-20 text-white placeholder-gray-300"
          />
        </div>
      </div>
    </div>
  );
};
const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => (
  <div className="rounded-lg bg-white bg-opacity-10 p-4">
    <h2 className="mb-3 text-xl font-bold">{title}</h2>
    {children}
  </div>
);

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="mb-2">
    <span className="font-semibold">{label}:</span>{" "}
    <span className="text-gray-200">{value}</span>
  </div>
);
export default StatusProfileContent;
