"use client";

import { BiographyAdd } from "@/actions/Biography/addBio";
import { updateBiography } from "@/actions/Biography/updateBio";

import { Label } from "@/components/ui/label";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  Textarea,
} from "@nextui-org/react";
import { Area, ProfileBiography, ProfileBiographySocial } from "@prisma/client";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { Cake, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, startTransition, useState } from "react";

interface ProfileInformationProps {
  biography?: ProfileBiography;
  address: string;
  dob: Date;
  schoolName: string;
  schoolLogo: string;
  areas?: Area[];
  socials?: ProfileBiographySocial[];
}
export const ProfileInformation = ({
  biography,
  address,
  dob,
  schoolName,
  schoolLogo,
  areas,
  socials,
}: ProfileInformationProps) => {
  const [buttonAdBio, setButtonAdBio] = useState(true);
  const [buttonUpdateBio, setButtonUpdateBio] = useState(true);
  const [buttonInputValue, setButtonInputValue] = useState(false);
  const [buttonAction, setButtonAction] = useState(false);
  const [textValue, setTextValue] = useState(biography?.content);
  const [loading, setLoading] = useState(false);

  const handleTextareaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const params = useParams();
  const studentCode = params.studentCode as string;
  const router = useRouter();

  const onAddBio = () => {
    setButtonAdBio((prev) => !prev);
    setButtonInputValue(true);
    setButtonAction(true);
  };

  const onUpdateBio = () => {
    setButtonUpdateBio((prev) => !prev);
    setButtonInputValue(true);
    setButtonAction(true);
  };

  const onCancel = () => {
    if (biography?.content) {
      setButtonAction(false);
      setButtonInputValue(false);
      setButtonAdBio(false);
      setButtonUpdateBio(true);
    } else {
      setButtonInputValue(false);
      setButtonAction(false);
      setButtonAdBio(true);
      setButtonUpdateBio(false);
    }
  };
  const onSave = async () => {
    startTransition(() => {
      if (biography?.content != null) {
        if (textValue != undefined || textValue != "") {
          updateBiography(studentCode, textValue!);
          setButtonAdBio(false);
          setButtonUpdateBio(true);
        }
        if (textValue == undefined || textValue == "") {
          setButtonAdBio(true);
          setButtonUpdateBio(false);
        }
      } else {
        if (textValue != undefined || textValue != "") {
          BiographyAdd(studentCode, textValue!);
          setButtonAdBio(false);
          setButtonUpdateBio(true);
        } else {
          setButtonAdBio(true);
          setButtonUpdateBio(false);
        }
      }
      setButtonAction(false);
      setButtonInputValue(false);
    });
    router.refresh();
  };

  return (
    <Card>
      <CardBody className="flex flex-col gap-2">
        {/* dasdasdas */}
        <Label className="font-semibold">Tiểu sử</Label>
        <div className="!flex flex-col items-start justify-center gap-2 text-sm">
          {<p className="mx-auto">{biography?.content || "chua co bio"}</p>}
          {buttonAdBio && (textValue == undefined || textValue == "") && (
            <Button onClick={onAddBio} className="h-[40px] w-full">
              Thêm
            </Button>
          )}
          {buttonUpdateBio &&
            biography?.content != undefined &&
            biography.content != "" && (
              <Button onClick={onUpdateBio} className="h-[40px] w-full">
                Cập nhật
              </Button>
            )}
          {buttonInputValue && (
            <Textarea
              onChange={(e) => handleTextareaChange(e)}
              value={textValue}
              size="sm"
              variant="faded"
            />
          )}
          <div className="flex">
            {buttonAction && (
              <Button
                onClick={onCancel}
                size="md"
                color="primary"
                variant="faded"
              >
                Thoát
              </Button>
            )}

            {buttonAction && (
              <Button
                onClick={onSave}
                color="success"
                size="md"
                className="ml-2"
              >
                Lưu
              </Button>
            )}
          </div>

          {/* dasdas */}
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 size-4" />
            <p className="">
              {address.split(",")[2]}, {address.split(",")[3]}
            </p>
          </div>
          <div className="flex items-center truncate text-muted-foreground">
            <Cake className="mr-2 size-4" />
            {format(dob, "dd, MMMM, yyyy", { locale: vi })}
          </div>
          <div className="flex items-center gap-2 truncate text-muted-foreground">
            <Avatar size="sm" src={schoolLogo} className="h-6 w-6" />
            {schoolName}
          </div>
        </div>
        <Divider />
        <Label className="font-semibold">Your areas</Label>
        {areas?.length! > 0 ? (
          <div>Khu vực của bạn</div>
        ) : (
          <p className="text-xs italic text-muted-foreground">
            Không có khu vực nào được chỉ định, vui lòng thêm khu vực mới liên
            quan đến loại của bạn.
          </p>
        )}
        <Divider />
        <Label className="font-semibold">Socials</Label>
        {socials?.length! > 0 ? (
          <div>Xã hội</div>
        ) : (
          <p className="text-xs italic text-muted-foreground">
            Không có mạng xã hội cụ thể, vui lòng thêm mạng xã hội mới liên quan
            đến loại của bạn.
          </p>
        )}
      </CardBody>
    </Card>
  );
};
