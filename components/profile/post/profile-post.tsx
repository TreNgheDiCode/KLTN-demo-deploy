"use client";

import { ProfilePostModal } from "@/components/modals/profile-post-modal";
import { useDisclosure } from "@nextui-org/react";
import { ProfilePostEditor } from "./profile-post-editor";

interface ProfilePostProps {
  name: string;
  image?: string;
}

export const ProfilePosts = ({ name, image }: ProfilePostProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <ProfilePostModal
        name={name}
        logo={image || ""}
        isOpen={isOpen}
        onClose={onClose}
      />
      <ProfilePostEditor onOpen={onOpen} logo={image || ""} />
    </>
  );
};
