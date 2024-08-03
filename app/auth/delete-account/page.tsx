import { DeleteAccountForm } from "@/components/auth/delete-account-form";
import Image from "next/image";
import { metadata } from "../../layout";

const DeleteAccountPage = () => {
  metadata.title = "Confitm delete account";
  return (
    <div className="relative h-full w-full">
      <Image
        fill
        src={"/login.jpg"}
        alt="deleteAccountConfirmation"
        className="absolute object-fill blur"
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <DeleteAccountForm />
      </div>
    </div>
  );
};

export default DeleteAccountPage;
