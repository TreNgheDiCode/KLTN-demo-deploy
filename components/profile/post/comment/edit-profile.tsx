import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Textarea,
  Card,
  CardBody,
} from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { ProfileEdit } from "@/types";
import { CardContent } from "@mui/material";
import { useRouter } from "next/navigation";
import { updateAddress } from "@/actions/account/updateAddress";
import { updateBiography } from "@/actions/Biography/biography";
import { updatePhoneNumber } from "@/actions/account/phoneNumber";
import { ProfileAvatarImageModal } from "@/components/modals/profile-avatar-model";

interface EditProfileProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  profileId: string;
}

export default function EditProfile({
  isOpen,
  onOpenChange,
  profileId,
}: EditProfileProps) {
  const [profile, setProfile] = useState<ProfileEdit | null>(null);
  const [contentBio, setContentBio] = useState("");
  const [textvalueAddress, setTextvalueAddress] = useState("");
  const [textvaluePhoneNumber, setTextvaluePhoneNumber] = useState("");
  const [statusBio, setStatusBio] = useState(true);
  const [statusAddress, setStatusAddress] = useState(true);
  const [statusPhone, setStatusPhone] = useState(true);
  // avatar
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const handleToggleAvatarModal = () => {
    setIsAvatarModalOpen((prev) => !prev);
  };

  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const Url = `${process.env.NEXT_PUBLIC_API}/api/profile/${profileId}`;
        const req = await fetch(Url, {
          method: "GET",
        });
        const res = await req.json();
        setProfile(res);
        setContentBio(res.biography.content);
        setTextvalueAddress(res.student.account.address);
        setTextvaluePhoneNumber(res.student.account.phoneNumber);
      } catch (error) {
        toast.error("Không lấy được thông tin profile");
      }
    }
    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);
  // Biography
  const onhandClickPenBio = () => {
    setStatusBio((prev) => !prev);
  };

  const handleTextBioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContentBio(event.currentTarget.value);
  };

  const handleUpdateBio = async (bioId: string, content: string) => {
    const res = await updateBiography(bioId, content);
    if (res.success) {
      toast.success(res.success);
    }
    if (res.error) {
      toast.error(res.error);
    }
    setStatusBio((prev) => !prev);
  };
  // Address

  const onhandClickPenAddress = () => {
    setStatusAddress((prev) => !prev);
  };

  const handleUpdateAddress = async (accountId: string, address: string) => {
    const res = await updateAddress(accountId, address);
    if (res.success) {
      toast.success(res.success);
    }
    if (res.error) {
      toast.error(res.error);
    }
    setStatusAddress((prev) => !prev);
  };

  const handleTextAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextvalueAddress(event.target.value);
  };
  // PhoneNumber
  const onhandClickPenPhone = () => {
    setStatusPhone((prev) => !prev);
  };
  const handleUpdatePhone = async (accountId: string, phoneNumber: string) => {
    const res = await updatePhoneNumber(accountId, phoneNumber);
    if (res.success) {
      toast.success(res.success);
    }
    if (res.error) {
      toast.error(res.error);
    }
    setStatusPhone((prev) => !prev);
  };
  const handleTextPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setTextvaluePhoneNumber(event.target.value);
  };
  // click xác nhận
  const onXacNhan = () => {
    router.refresh();
  };

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black  dark:text-white">
                Edit Profile
              </ModalHeader>
              <ModalBody>
                {/* Avatar */}
                <div className="flex items-center justify-between p-4 text-black  dark:text-white">
                  <div className="font-bold">
                    <p>Ảnh đại diện</p>
                  </div>
                  <div className="cursor-pointer">
                    <Pencil id="editavatar" onClick={handleToggleAvatarModal} />
                  </div>
                  {isAvatarModalOpen && (
                    <ProfileAvatarImageModal
                      accountId={profile?.student.account.id!}
                      isOpen={true}
                      onClose={onClose}
                      image={profile?.student.account.image}
                    />
                  )}
                </div>
                <div className="flex items-center justify-center text-black  dark:text-white">
                  <Avatar
                    src={profile?.student.account.image || ""}
                    alt=""
                    className="h-[100px] w-[100px] "
                  />
                </div>
                {/* Bio */}
                <div className="flex items-center justify-between p-4 text-black  dark:text-white">
                  <div className="font-bold">
                    <p>Bio</p>
                  </div>
                  <div className="cursor-pointer">
                    <Pencil id="1" onClick={onhandClickPenBio} />
                  </div>
                </div>
                {statusBio ? (
                  <div className="flex items-center justify-center text-black  dark:text-white">
                    {contentBio || "Không có bio"}
                  </div>
                ) : (
                  <Card>
                    <CardContent>
                      <Textarea
                        onChange={(e) => handleTextBioChange(e)}
                        className="mb-2 text-black  dark:text-white"
                        variant="faded"
                        value={contentBio}
                      />
                      <div className="relative w-full  dark:text-white">
                        <div className="justify-content-end absolute right-0">
                          <Button
                            color="success"
                            onClick={() =>
                              handleUpdateBio(
                                profile?.biography.id || "",
                                contentBio || "",
                              )
                            }
                          >
                            Lưu
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardBody></CardBody>
                  </Card>
                )}
                {/* Address */}
                <div className="flex items-center justify-between p-4 text-black  dark:text-white">
                  <div className="font-bold">
                    <p>Địa chỉ</p>
                  </div>
                  <div className="cursor-pointer">
                    <Pencil onClick={onhandClickPenAddress} />
                  </div>
                </div>
                {statusAddress ? (
                  <div className="flex items-center justify-center  text-black  dark:text-white">
                    {textvalueAddress || "Không có địa chỉ"}
                  </div>
                ) : (
                  <Card>
                    <CardContent>
                      <Textarea
                        id="textaddress"
                        onChange={(e) => handleTextAddressChange(e)}
                        value={textvalueAddress}
                        className="mb-2"
                        variant="faded"
                      />
                      <div className="relative w-full  text-black  dark:text-white">
                        <div className="justify-content-end absolute right-0">
                          <Button
                            color="success"
                            onClick={() =>
                              handleUpdateAddress(
                                profile?.student.account.id || "",
                                textvalueAddress || "",
                              )
                            }
                          >
                            Lưu
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardBody></CardBody>
                  </Card>
                )}
                {/* Phone Number */}
                <div className="flex items-center justify-between p-4  text-black  dark:text-white">
                  <div className="font-bold">
                    <p>Số điện thoại</p>
                  </div>
                  <div className="cursor-pointer">
                    <Pencil onClick={onhandClickPenPhone} />
                  </div>
                </div>
                {statusPhone ? (
                  <div className="flex items-center justify-center text-black  dark:text-white">
                    {textvaluePhoneNumber || "Chưa cài số điện thoại"}
                  </div>
                ) : (
                  <Card>
                    <CardContent>
                      <Textarea
                        value={textvaluePhoneNumber}
                        onChange={(e) => handleTextPhoneNumber(e)}
                        className="mb-2 "
                        variant="faded"
                        type="Number"
                      />
                      <div className="relative w-full">
                        <div className="justify-content-end absolute right-0  text-black  dark:text-white">
                          <Button
                            color="success"
                            onClick={() =>
                              handleUpdatePhone(
                                profile?.student.account.id || "",
                                textvaluePhoneNumber || "",
                              )
                            }
                          >
                            Lưu
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardBody></CardBody>
                  </Card>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="faded"
                  onPress={onClose}
                  onClick={onXacNhan}
                >
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
