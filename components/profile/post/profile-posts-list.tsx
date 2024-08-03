"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { PostLib } from "@/types";
import { ProfilePostItem } from "./profile-post-item";
import { useTranslation } from "react-i18next";

interface ProfilePostsListProps {
  logo?: string;
  name: string;
  posts: PostLib[];
  profileId: string;
}

export const ProfilePostsList = ({
  logo,
  name,
  posts,
  profileId,
}: ProfilePostsListProps) => {
  const { t } = useTranslation("social");
  const [sort, setSort] = useState<"New" | "Relevant">("New");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center">
        <Spinner color="success" size="lg" />
      </div>
    );
  }
  if (!posts)
    return (
      <div className="flex items-center justify-center text-3xl font-semibold text-primary">
        No posts found. Please create a new one.
      </div>
    );
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="ml-2 text-xl font-bold text-primary">
          {posts?.length} {t("posts")}
        </h1>
      </div>
      {posts?.map((post) => {
        return (
          <ProfilePostItem
            key={post.id}
            id={post.id}
            images={post.images}
            content={post.content || undefined}
            name={name}
            logo={logo!}
            createdAt={post.createdAt}
            isModified={post.createdAt !== post.updatedAt}
            status={post.status}
            comments={post.comments}
            likes={post.likes}
            saves={post.saves}
            profileId={profileId}
          />
        );
      })}
    </>
  );
};
