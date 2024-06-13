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
  Student,
  StudentStatus,
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

export type SchoolLib = School & {
  programs: {
    name: string;
  }[];
};
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
  };
  school: {
    name: string;
    logo: string;
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
