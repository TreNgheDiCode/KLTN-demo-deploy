import {
  Post,
  PostComment,
  PostCommentLike,
  PostImage,
  PostLike,
  PostSave,
  Profile,
  ProfileBiography,
  School,
  SchoolGallery,
  SchoolGalleryImage,
  SchoolLocation,
  SchoolLocationContact,
  SchoolLocationImage,
  SchoolProgram,
  SchoolScholarship,
  SchoolScholarshipImage,
  Student,
  StudentStatus,
  ChatSession,
  ChatSessionMessage,
} from "@prisma/client";

export type ListLike = {
  id: string;
  profile: {
    id: string;
    student: {
      account: {
        name: string;
      };
    };
  };
  post: Post & {
    images: PostImage[];
  };
};
export type ListSave = {
  id: string;
  profile: {
    id: string;
    student: {
      account: {
        name: string;
      };
    };
  };
  post: Post & {
    images: PostImage[];
  };
};

export type SchoolData = (School & {
  news: News[];
  galleries: (SchoolGallery & {
    images: SchoolGalleryImage[];
  })[];
  locations: (SchoolLocation & {
    contacts: SchoolLocationContact[];
    images: SchoolLocationImage[];
  })[];
  programs: (SchoolProgram & {
    studentPrograms: {
      student: {
        id: string;
        studentCode: string | null;
        account: {
          name: string;
        };
        cover: string | null;
        degreeType: string;
        certificateType: string;
        gradeType: string;
        gradeScore: number;
        status: string;
      };
    }[];
  })[];
  scholarships: (SchoolScholarship & {
    images: SchoolScholarshipImage[];
    owners: {
      student: Student;
    }[];
  })[];
})[];

export type SchoolLib = {
  data: SchoolData;
  info: AccelerateInfo | null;
};

export interface AccelerateInfo {
  /**
   * The cache status of the response.
   * * `ttl` indicates a cache hit within the `ttl` duration and no database query was executed
   * * `swr` indicates a cache hit within the `swr` duration and the data is being refreshed by Accelerate in the background
   * * `miss` indicates that both `ttl` and `swr` have expired and the database query was executed by the request
   * * `none` indicates that no cache strategy was specified and the database query was executed by the request
   */
  cacheStatus: "ttl" | "swr" | "miss" | "none";
  /**
   * The date the response was last refreshed.
   */
  lastModified: Date;
  /**
   * The datacenter region that received the request.
   */
  region: string;
  /**
   * Unique identifier of the request. Useful for troubleshooting.
   */
  requestId: string;
  /**
   * The unique signature of the Prisma operation.
   */
  signature: string;
}

export type PostCommentLib = PostComment & {
  likes: PostCommentLike[];
  children: PostComment[];
};

export type PostLib = Post & {
  images: PostImage[];
  likes: PostLike[];
  comments: PostCommentLib[];
  saves: PostSave[];
};

export type AccountIdLib = {
  id: string;
  name: string;
  image?: string;
  email: string;
  isTwoFactorEnabled: boolean;
  student: {
    studentCode: string;
    status: StudentStatus;
    profile: Profile;
  };
};

export type StudentLib = Student & {
  account: {
    dob: Date;
    address: string;
    name: string;
    image: string;
    email: string;
    idCardNumber: string;
    gender: string;
  };
  school: {
    name: string;
    logo: string;
    programs: {
      name: string;
    }[];
  };
  profile: Profile & {
    posts: PostLib[];
    biography: ProfileBiography;
  };
};

export type Ward = {
  Id: string;
  Name: string;
  Level: string;
};

export type District = {
  Id: string;
  Name: string;
  Wards: Ward[];
};

export type City = {
  Id: string;
  Name: string;
  Districts: District[];
};
export type ProfileEdit = {
  id: string;
  biography: {
    id: string;
    content: string;
  };
  student: {
    account: {
      id: string;
      image: string;
      address: string;
      phoneNumber: string;
    };
  };
};

export type User = {
  studentCode: string;
  account: {
    name: string;
    image: string;
  };
  school: {
    name: string;
  };
};

export type Friend = {
  studentCode: string;
  profile: {
    id: string;
    posts: PostLib[];

    status: string;
  };
  account: {
    name: string;
    image: string;
  };
};

export type News = {
  id: string;
  title: string;
  content: string;
  type: string;
  cover: string;
  isPublished: string;
  schoolId: string;
  creatAt: string;
  updateAt: string;
  school: {
    name: string;
  };
};

export type ChatSessionLib =
  | (ChatSession & {
      messages: ChatSessionMessage[];
    })
  | null;
