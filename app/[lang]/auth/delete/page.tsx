import { DeleteForm } from "@/components/auth/delete-form";
import Image from "next/image";
import { metadata } from "../../layout";

const ResetPage = () => {
  metadata.title = "Delete account";
  return (
    <div className="relative h-full w-full">
      <Image
        fill
        src={"/login.jpg"}
        alt="deleteAccount"
        className="absolute object-fill blur"
        quality={100}
        priority
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <DeleteForm />
      </div>
    </div>
  );
};

export default ResetPage;
