import {
  Post,
  PostComment,
  PostCommentLike,
  PostImage,
  PostLike,
  PostSave,
  PostShare,
  Profile,
  School,
  StudentStatus,
} from "@prisma/client";

export type SchoolLib = School & {
  programs: {
    name: string;
  }[];
};

export type ProfileLib = Profile & {
  user: {
    dob: Date;
    address: string;
    studentCode: string;
    name: string;
    image: string;
    school: {
      name: string;
      logo: string;
    };
  };
  biography: Biography;
};

export type PostLib = Post & {
  comments: PostCommentLib[];
  likes: PostLike[];
  images: PostImage[];
  saves: PostSave[];
  shares: PostShare[];
};

export type PostCommentLib = PostComment & {
  image: PostCommentImage;
  children: {
    id: string;
  }[];
  likes: PostCommentLike[];
};

export type AccountEmailLib = {
  id: string;
  name: string;
  image?: string;
  email: string;
  isTwoFactorEnabled: boolean;
  student: {
    studentCode: string;
    status: StudentStatus;
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

export type SchoolWithPrograms = School & { programs: Program[] };

export type ExtendedComment = PostComment & {
  commentImage: PostCommentImage | null;
  children: ExtendedComment[];
};

export type BasicComment = PostComment & {
  commentImage: PostCommentImage | null;
  children: { id: string }[];
  likes: PostCommentLike[];
};

export type ExtendedPost = Post & {
  images: PostImage[];
  comments: BasicComment[];
  likes: PostLike[];
  saves: PostSave[];
};
