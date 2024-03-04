import {
  Post,
  PostComment,
  PostCommentImage,
  PostCommentLike,
  PostImage,
  PostLike,
  PostSave,
  Program,
  School
} from "@prisma/client";

export type Ward = {
  Id: string;
  Name: string;
  Level: string;
};

export type District = {
  Id: string;
  Name: string;
  Wards: {
    Id: string;
    Name: string;
    Wards: Ward[];
  };
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
  postImages: PostImage[];
  comments: BasicComment[];
  likes: PostLike[];
  saves: PostSave[];
};




// ({
//   postImages[];
//   comments: ({
//       commentImage: PostCommentImage | null;
//       children: PostComment[];
//   } & {
//       id: string;
//       content: string | null;
//       ... 5 more ...;
//       updatedAt: Date;
//   })[];
// } & {
//   ...;
// })
