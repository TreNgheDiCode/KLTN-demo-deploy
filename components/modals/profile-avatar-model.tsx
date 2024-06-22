"use client";

import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { SingleImageDropzone } from "../single-image-dropzone";
import { startTransition, useState } from "react";
import { toast } from "sonner";
import { useEdgeStore } from "@/hooks/use-edgestore";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { uploadProfileAvatar } from "@/actions/profile/profile-avatar";

interface ProfileAvatarImageModal {
  isOpen: boolean;
  onOpenChange: () => void;
  accountId: string;
  image?: string | undefined;
}

export const ProfileAvatarImageModal = ({
  isOpen,
  onOpenChange,
  accountId,
  image,
}: ProfileAvatarImageModal) => {
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(image);
  const { edgestore } = useEdgeStore();

  const clearImage = () => {
    setAvatar(undefined);
  };

  const onUpload = (file: File | undefined) => {
    setFile(file);
  };

  const onPress = async () => {
    if (file) {
      setIsLoading(true);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: image ?? undefined,
        },
      });

      startTransition(() => {
        uploadProfileAvatar(accountId, res.url).then((res) => {
          if (res.error) {
            toast.error(res.error);
          }
          if (res.success) {
            toast.success(res.success);
          }
        });
      });

      setFile(undefined);
      setIsLoading(false);
      onOpenChange();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        setAvatar(image);
      }}
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-primary">
            Upload your new profile avatar
          </h2>
          <p className="text-xs text-muted-foreground">
            16:9 image resolution is recommended
          </p>
        </ModalHeader>
        <ModalBody className="relative">
          {avatar ? (
            <>
              <div className="flex items-center justify-center ">
                <Image
                  src={avatar}
                  alt="profile avatar"
                  className="h-[200px] w-[200px] rounded-full"
                />
              </div>
              <X
                onClick={clearImage}
                className="absolute right-3 top-0 z-10 rounded-full bg-rose-500/30 text-primary text-rose-500 hover:cursor-pointer"
              />
            </>
          ) : (
            <SingleImageDropzone
              disabled={isLoading}
              className="w-full   outline-none"
              value={file}
              onSelect={onUpload}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={isLoading}
            color="danger"
            variant="light"
            onPress={onOpenChange}
          >
            Close
          </Button>
          {file && !avatar && (
            <Button isDisabled={isLoading} color="primary" onPress={onPress}>
              Upload
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
