import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deletePost } from "@/actions/profile/post";
interface props {
  id: string;
}
export default function ResponsiveDialog({ id }: props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const router = useRouter();
  const onDeletePost = async (id: string) => {
    await deletePost(id).then((res) => {
      if (res?.success) {
        toast.success(res.success);
        setOpen(false);
      }
      if (res?.error) {
        toast.error(res.error);
      }
    });
    router.refresh();
  };

  return (
    <React.Fragment>
      <MoreHorizontal
        className="h-6 w-6 text-zinc-600 hover:cursor-pointer hover:text-zinc-500 dark:text-zinc-400 "
        onClick={handleOpen}
      />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className=""
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="ark:border-white font-medium dark:bg-black dark:text-white"
        >
          {"Bạn có chắc muốn xóa bài post?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText>Bạn có chắc muốn xóa</DialogContentText>
        </DialogContent> */}

        <DialogActions className=" dark:border-white dark:bg-black dark:text-white">
          <Button onClick={() => onDeletePost(id)} autoFocus>
            Có
          </Button>
          <Button autoFocus onClick={handleClose}>
            Không
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
