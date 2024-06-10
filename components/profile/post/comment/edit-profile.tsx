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
import { updateBiography } from "@/actions/Biography/biographu";
import { BiSolidUpsideDown } from "react-icons/bi";
interface EditProfileProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  profileId: string;
}
export default function Editprofile({
  isOpen,
  onOpenChange,
  profileId,
}: EditProfileProps) {
  useEffect(() => {
    async function fetchProfile() {
      try {
        const Url = `${process.env.NEXT_PUBLIC_API}/api/profile/${profileId}`;
        const req = await fetch(Url, {
          method: "GET",
        });
        const res = await req.json();
        setProfile(res);
      } catch (error) {
        toast.error("Không lấy được thông tin profile");
      }
    }
    fetchProfile();
  }, [profileId]);

  const [profile, setProfile] = useState<ProfileEdit>();
  const [contentBio, setContentBio] = useState(profile?.biography.content);
  const [textvalueAddress, setTextvalueAddress] = useState(
    profile?.student.account.address,
  );
  const [statusBio, setStatusBio] = useState(true);
  const [statusAddress, setStatusAddress] = useState(true);
  const [statusPhone, setStatusPhone] = useState(true);
  const onhandClickPenPhone = () => {
    setStatusPhone((prev) => !prev);
  };
  const onhandClickPenBio = () => {
    setStatusBio((prev) => !prev);
  };
  const onhandClickPenAddress = () => {
    setStatusAddress((prev) => !prev);
  };

  const handleTextBioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContentBio(event.target.value);
  };
  const handleTextAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextvalueAddress(event.target.value);
  };

  const handleUpdateBio = async (bioId: string, content: string) => {
    const res = await updateBiography(bioId, content);
    if (res.success) {
      toast.success(res.success);
      setStatusBio(true);
    }
    if (res.error) {
      toast.error(res.error);
    }
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
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile
              </ModalHeader>
              <ModalBody>
                {/* Avarta */}
                <div className="flex items-center justify-between p-4">
                  <div className="font-bold">
                    <p>Ảnh đại diện</p>
                  </div>
                  <div className="cursor-pointer">
                    <Pencil />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Avatar
                    src={profile?.student.account.image || ""}
                    alt=""
                    className="h-[100px] w-[100px] "
                  />
                </div>
                {/* Bio */}
                <div className="flex items-center justify-between p-4">
                  <div className="font-bold">
                    <p>Bio</p>
                  </div>
                  <div className="cursor-pointer">
                    <Pencil id="1" onClick={onhandClickPenBio} />
                  </div>
                </div>
                {statusBio ? (
                  <div className="flex items-center justify-center">
                    {profile?.biography.content || "Không có bio"}
                  </div>
                ) : (
                  <Card>
                    <CardContent>
                      <Textarea
                        onChange={(e) => handleTextBioChange(e)}
                        className="mb-2"
                      />
                      <div className="relative w-full">
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

                {/* Địa chỉ  */}
                <div className="flex items-center justify-between p-4">
                  <div className="font-bold">
                    <p>Địa chỉ</p>
                  </div>
                  <div className="cursor-pointer">
                    <Pencil onClick={onhandClickPenAddress} />
                  </div>
                </div>
                {statusAddress ? (
                  <div className="flex items-center justify-center">
                    {profile?.student.account.address}
                  </div>
                ) : (
                  <Card>
                    <CardContent>
                      <Textarea
                        onChange={(e) => handleTextAddressChange(e)}
                        value={textvalueAddress}
                        className="mb-2"
                      />
                      <div className="relative w-full">
                        <div className="justify-content-end absolute right-0">
                          <Button color="success">Lưu</Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardBody></CardBody>
                  </Card>
                )}

                {/* sdt */}
                <div className="flex items-center justify-between p-4">
                  <div className="font-bold">
                    <p>Số điện thoại</p>
                  </div>
                  <div className="cursor-pointer">
                    <Pencil onClick={onhandClickPenPhone} />
                  </div>
                </div>
                {statusPhone ? (
                  <div className="flex items-center justify-center">
                    {profile?.student.account.phoneNumber}
                  </div>
                ) : (
                  <Card>
                    <CardContent>
                      <Textarea
                        onChange={(e) => handleTextAddressChange(e)}
                        value={textvalueAddress}
                        className="mb-2"
                      />
                      <div className="relative w-full">
                        <div className="justify-content-end absolute right-0">
                          <Button color="success">Lưu</Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardBody></CardBody>
                  </Card>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="faded" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
