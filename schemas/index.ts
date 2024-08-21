import {
  CertificateType,
  ChatSessionRole,
  Country,
  DegreeType,
  FeedbackType,
  Gender,
  GradeType,
  NewsType,
  PostStatus,
  StudentStatus,
} from "@prisma/client";
import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.optional(z.string()),
});

export const LoginSchema = z.object({
  email: z.optional(
    z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email(),
  ),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z
  .object({
    image: z.optional(z.string()),
    email: z
      .string({
        required_error: "Vui lòng nhập email",
      })
      .min(1, {
        message: "Vui lòng nhập email",
      })
      .email({
        message: "Vui lòng nhập email hợp lệ",
      }),
    password: z
      .string({
        required_error: "Vui lòng nhập mật khẩu",
      })
      .min(1, {
        message: "Vui lòng nhập mật khẩu",
      }),
    confirmPassword: z
      .string({
        required_error: "Vui lòng xác nhận mật khẩu",
      })
      .min(1, {
        message: "Vui lòng xác nhận mật khẩu",
      }),
    name: z
      .string({
        required_error: "Vui lòng nhập họ và tên",
      })
      .min(1, {
        message: "Vui lòng nhập họ và tên",
      }),
    dob: z
      .date({
        required_error: "Vui lòng chọn ngày sinh",
      })
      .min(new Date("1970-01-01"), {
        message: "Tuổi của bạn quá lớn",
      })
      .max(new Date("2006-31-12"), {
        message: "Tuổi của bạn quá nhỏ",
      }),
    gender: z.enum([Gender.MALE, Gender.FEMALE], {
      invalid_type_error: "Giới tính không hợp lệ",
    }),
    phoneNumber: z
      .string({
        invalid_type_error: "Số điện thoại không hợp lệ",
        required_error: "Số điện thoại là bắt buộc",
      })
      .min(10, {
        message: "Vui lòng nhập ít nhất 10 số",
      })
      .max(13, {
        message: "Vui lòng nhập tối đa 13 số",
      }),
    idCardNumber: z
      .string({
        required_error: "CCCD/CMND là bắt buộc",
      })
      .min(1, {
        message: "Vui lòng nhập CCCD/CMND",
      }),
    country: z.enum([Country.AUSTRALIA, Country.CANADA, Country.KOREA], {
      message: "Vui lòng chọn quốc gia",
    }),
    city: z
      .string({
        required_error: "Vui lòng chọn thành phố",
      })
      .min(1, {
        message: "Vui lòng chọn thành phố",
      }),
    district: z
      .string({
        required_error: "Vui lòng chọn quận/huyện",
      })
      .min(1, {
        message: "Vui lòng chọn quận/huyện",
      }),
    ward: z
      .string({
        required_error: "Vui lòng chọn phường/xã",
      })
      .min(1, {
        message: "Vui lòng chọn phường/xã",
      }),
    addressLine: z
      .string({
        required_error: "Vui lòng nhập địa chỉ",
      })
      .min(1, {
        message: "Vui lòng nhập địa chỉ",
      }),
    schoolName: z
      .string({
        required_error: "Vui lòng chọn trường học",
      })
      .min(1, {
        message: "Vui lòng chọn trường học",
      }),
    programName: z
      .string({
        required_error: "Vui lòng chọn chương trình đào tạo",
      })
      .min(1, {
        message: "Vui lòng chọn chương trình đào tạo",
      }),
    degreeType: z.enum([DegreeType.HIGHSCHOOL, DegreeType.UNIVERSITY], {
      required_error: "Vui lòng chọn loại học vấn",
      invalid_type_error: "Loại học vấn không hợp lệ",
    }),
    certificateType: z.enum([CertificateType.IELTS, CertificateType.TOEFL], {
      required_error: "Vui lòng chọn loại chứng chỉ",
      invalid_type_error: "Loại chứng chỉ không hợp lệ",
    }),
    certificateImg: z
      .string({
        required_error: "Vui lòng chọn ảnh chứng chỉ",
      })
      .min(1, {
        message: "Vui lòng chọn ảnh chứng chỉ",
      }),
    gradeType: z.enum([GradeType.GPA, GradeType.CGPA], {
      required_error: "Vui lòng chọn thang điểm",
      invalid_type_error: "Thang điểm không hợp lệ",
    }),
    gradeScore: z
      .string({
        required_error: "Vui lòng nhập tổng điểm trung bình tích lũy",
      })
      .min(1, {
        message: "Vui lòng nhập tổng điểm trung bình tích lũy",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không trùng khớp",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.gradeType === GradeType.GPA) {
        if (data.gradeScore && parseInt(data.gradeScore) > 4) {
          return false;
        }

        if (data.gradeScore && parseInt(data.gradeScore) < 0) {
          return false;
        }

        return true;
      }

      if (data.gradeType === GradeType.CGPA) {
        if (data.gradeScore && parseInt(data.gradeScore) > 10) {
          return false;
        }

        if (data.gradeScore && parseInt(data.gradeScore) < 0) {
          return false;
        }

        return true;
      }
    },
    {
      message: "Điểm không hợp lệ với thang điểm",
      path: ["gradeScore"],
    },
  );

export type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      // Minimum length of 8 characters
      .min(8, { message: "Password must be at least 8 characters long" })
      // Maximum length of 25 characters
      .max(25, { message: "Password cannot exceed 25 characters" })
      // Check for at least one digit
      .refine((value) => /\d/.test(value), {
        message: "Password must contain at least one digit",
      })
      // Check for at least one lowercase letter
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      // Check for at least one uppercase letter
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      // Check for at least one special character
      .refine((value) => /[^\w\s]/.test(value), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords mismatch",
    path: ["confirmPassword"],
  });

export const ResetSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid type of email",
    }),
});

export const DeleteSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.optional(z.string().min(1, { message: "Password is required" })),
});

export type DeleteFormValues = z.infer<typeof DeleteSchema>;

export const PostSchema = z.object({
  status: z.optional(
    z.enum([
      PostStatus.PUBLIC,
      PostStatus.PRIVATE,
      PostStatus.FRIENDS,
      PostStatus.EXCEPT,
    ]),
  ),
  content: z.optional(z.string()),
  images: z.optional(z.array(z.string())),
});

export const NewSchoolSchema = z.object({
  name: z.string().min(1, {
    message: "Vui lòng nhập tên trường",
  }),
  logo: z.string().min(1, {
    message: "Vui lòng chọn ảnh đại diện cho trường",
  }),
  short: z.string().min(1, {
    message: "Vui lòng nhập giới thiệu ngắn cho trường",
  }),
  background: z.string().min(1, {
    message: "Vui lòng chọn hình nền cho trường",
  }),
  color: z.string().min(1, {
    message: "Vui lòng nhập mã màu đại diện cho trường",
  }),
  country: z.enum([Country.AUSTRALIA, Country.CANADA, Country.KOREA]),
});

export const UpdateStudent = z.object({
  isLocked: z.optional(z.boolean()),
  status: z.optional(
    z.enum([
      StudentStatus.APPROVED,
      StudentStatus.DROPPED,
      StudentStatus.STUDYING,
      StudentStatus.AWAITING,
    ]),
  ),
  email: z.optional(
    z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Invalid type of email",
      }),
  ),
  name: z.optional(
    z.string().min(1, {
      message: "Fullname is required",
    }),
  ),
  dob: z.optional(
    z
      .date({
        required_error: "Date of birth is required",
      })
      .min(new Date("1970-01-01"), {
        message: "Your age is too old",
      })
      .max(new Date("2006-31-12"), {
        message: "Your age is too young",
      }),
  ),
  gender: z.optional(
    z.enum([Gender.MALE, Gender.FEMALE], {
      invalid_type_error: "Invalid type, please reselect",
    }),
  ),
  phoneNumber: z.optional(
    z
      .string({
        invalid_type_error: "Invalid phone number",
        required_error: "Phone number is required",
      })
      .min(10, {
        message: "Minimum 10 numbers is required",
      })
      .max(13, {
        message: "Maximum 13 numbers is required",
      }),
  ),
  idCardNumber: z.optional(
    z
      .string({
        required_error: "Id card number is required",
      })
      .min(1, {
        message: "Id card number is required",
      }),
  ),
  city: z.optional(
    z.string().min(1, {
      message: "City is required",
    }),
  ),
  district: z.optional(
    z.string().min(1, {
      message: "District is required",
    }),
  ),
  ward: z.optional(
    z.string().min(1, {
      message: "Ward is required",
    }),
  ),
  addressLine: z.optional(
    z.string().min(1, {
      message: "Address line is required",
    }),
  ),
  additional: z.optional(z.string()),
});

export const NewsSchema = z.object({
  id: z.optional(z.string()),
  title: z.string().min(1, {
    message: "Vui lòng nhập tiêu đề",
  }),
  content: z.string().min(1, {
    message: "Vui lòng nhập nội dung",
  }),
  type: z.enum([NewsType.ANNOUNCEMENT, NewsType.EVENT, NewsType.BLOG]),
  cover: z.string().min(1, {
    message: "Vui lòng chọn ảnh đại diện",
  }),
  isPublished: z.boolean(),
  schoolId: z.optional(z.string()),
});

export const CreateScholarshipSchema = z.object({
  name: z.string().min(1, {
    message: "Vui lòng nhập tiêu đề",
  }),
  description: z.string().min(1, {
    message: "Vui lòng nhập mô tả",
  }),
  cover: z.string().min(1, {
    message: "Vui lòng chọn ảnh đại diện",
  }),
  isPublished: z.boolean(),
  images: z.optional(z.array(z.string())),
  owners: z.optional(z.array(z.string())),
});

export const ContactSchema = z.object({
  name: z.string().min(1, {
    message: "Vui lòng nhập tên",
  }),
  email: z.string().email({
    message: "Vui lòng nhập email",
  }),
  title: z.enum(
    [
      FeedbackType.BILLING,
      FeedbackType.FEEDBACK,
      FeedbackType.PROCEDURE,
      FeedbackType.REFUND,
      FeedbackType.SCHOLARSHIP,
      FeedbackType.SYSTEM,
      FeedbackType.GENERAL,
      FeedbackType.QUESTION,
      FeedbackType.UNKNOWN,
    ],
    {
      message: "Vui lòng chọn tiêu đề",
    },
  ),
  phone: z.string().min(1, {
    message: "Vui lòng nhập số điện thoại",
  }),
  message: z.string().min(1, {
    message: "Vui lòng nhập nội dung",
  }),
  schoolId: z.optional(z.string()),
});

export type ContactFormValues = z.infer<typeof ContactSchema>;

export const AccountFormSchema = z
  .object({
    email: z.optional(
      z
        .string({
          invalid_type_error: "Invalid email",
        })
        .email(),
    ),
    password: z.optional(z.string()),
    confirmPassword: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password !== undefined && data.confirmPassword === undefined) {
        return false;
      }

      if (data.password === undefined && data.confirmPassword !== undefined) {
        return false;
      }

      if (
        data.password !== undefined &&
        data.confirmPassword !== undefined &&
        data.password !== data.confirmPassword
      ) {
        return false;
      }

      return true;
    },
    {
      message: "Passwords mismatch",
      path: ["confirmPassword"],
    },
  );

export const CommentSchema = z.object({
  content: z.optional(z.string()),
  image: z.optional(z.string()),
});

export const ChatSupportSchema = z.object({
  userId: z.optional(z.string()),
  name: z.optional(z.string()),
  email: z.optional(z.string()),
  phone: z.optional(z.string()),
  clientId: z.optional(z.string()),
  role: z.enum([ChatSessionRole.ADMIN, ChatSessionRole.USER], {
    required_error: "Vai trò không được để trống",
    invalid_type_error: "Vai trò không hợp lệ",
  }),
  message: z.string().min(1, {
    message: "Tin nhắn không được để trống",
  }),
});

export type ChatSupportFormValues = z.infer<typeof ChatSupportSchema>;
