"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import { PostImage, PostLike, PostSave, PostStatus } from "@prisma/client";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import {
  Bookmark,
  Globe2,
  Heart,
  Lock,
  MessageCircleMore,
  MoreHorizontal,
  Share2,
  UserX,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProfileCommentForm } from "./comment/profile-comment-form";
import { ProfileCommentsList } from "./comment/profile-comments-list";
import { PostCommentLib } from "@/types";
import { useSession } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import ResponsiveDialog from "@/components/Component-Profile/alertDeletePost";
import { Like } from "@/actions/profile/like";
import { Save } from "@/actions/profile/save";

interface ProfilePostItemProps {
  id: string;
  images?: PostImage[];
  content?: string;
  name: string;
  logo: string;
  createdAt: Date;
  isModified: boolean;
  status: PostStatus;
  comments?: PostCommentLib[];
  likes?: PostLike[];
  saves?: PostSave[];
  profileId: string;
}

const statusType = {
  PUBLIC: <Globe2 className="size-4" />,
  PRIVATE: <Lock className="size-4" />,
  FRIENDS: <Users className="size-4" />,
  EXCEPT: <UserX className="size-4" />,
};

export const ProfilePostItem = ({
  id,
  images,
  content,
  logo,
  name,
  createdAt,
  status,
  comments,
  likes,
  saves,
  profileId,
}: ProfilePostItemProps) => {
  const router = useRouter();
  const session = useSession();
  const studentCode = session.data?.user.studentCode;

  if (!studentCode) {
    router.push(DEFAULT_LOGIN_REDIRECT);
  }

  const parentComments = comments?.filter(
    (comment) => !comment.parentCommentId,
  );

  const isSave = saves?.some((save) => save.profileId == profileId);

  const onSave = async () => {
    await Save(id);
    router.refresh();
  };

  const isLike = likes?.some((like) => like.profileId == profileId);

  const onLike = async () => {
    await Like(id);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader className="items-center justify-between pr-6">
        <div className="flex items-start gap-2">
          <Avatar src={logo} alt="logo" />
          <div className="flex flex-col items-start justify-start">
            <p className="font-bold text-primary">{name}</p>
            <div className="flex items-center gap-[1px]">
              <p className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
                <span>{format(createdAt, "dd MMMM", { locale: vi })}</span>
                <span>at</span>
                <span>{format(createdAt, "p", { locale: vi })}</span>
              </p>
              <Chip
                size="sm"
                variant="dot"
                className="p-0"
                classNames={{ dot: "w-1 h-1", base: "border-0" }}
              >
                {statusType[status]}
              </Chip>
            </div>
          </div>
        </div>
        <ResponsiveDialog id={id} />
      </CardHeader>
      <CardBody className="pt-0">
        <p className="font-semibold text-primary">{content}</p>
        {images && (
          <div className="grid grid-cols-2 gap-2">
            {images.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                alt="post image"
                className="aspect-square"
                classNames={{
                  wrapper: images.length === 1 && "col-span-2 aspect-video",
                }}
              />
            ))}
          </div>
        )}
      </CardBody>
      <div className="px-4">
        <Divider />
        <div className="grid grid-cols-4 gap-1 ">
          <Button
            onClick={onLike}
            startContent={<Heart fill={isLike ? "red" : "white"} />}
            variant="light"
            color="primary"
          >
            {likes?.length || 0} Likes
          </Button>
          <Button
            startContent={<MessageCircleMore />}
            variant="light"
            color="primary"
          >
            {comments?.length} Comments
          </Button>

          <Button startContent={<Share2 />} variant="light" color="primary">
            0 Share
          </Button>
          <Button
            onClick={onSave}
            startContent={<Bookmark fill={isSave ? "yellow" : "white"} />}
            variant="light"
            color="primary"
          >
            Saved
          </Button>
        </div>
        <Divider />
      </div>
      <CardFooter className="flex-col items-start justify-start gap-2">
        <ProfileCommentsList
          comments={parentComments}
          name={name}
          image={logo}
        />
        <ProfileCommentForm logo={logo} postId={id} />
      </CardFooter>
    </Card>
  );
};
