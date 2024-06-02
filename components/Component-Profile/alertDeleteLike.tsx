import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { onDeleteListLike } from "@/actions/profile/like";
import { useRouter } from "next/navigation";
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
  const onDelete = async (likeId: string) => {
    await onDeleteListLike(likeId).then((res) => {
      if (res.success) {
        toast.success(res.success);
        setOpen(false);
        window.location.reload();
      } else {
        toast.error(res);
      }
    });
  };

  return (
    <React.Fragment>
      <Trash2
        className="ml-1 hover:cursor-pointer"
        onClick={handleOpen}
        color="red"
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
          {"Bạn có chắc muốn xóa lượt thích này?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText>Bạn có chắc muốn xóa</DialogContentText>
        </DialogContent> */}

        <DialogActions className=" dark:border-white dark:bg-black dark:text-white">
          <Button onClick={() => onDelete(id)} autoFocus>
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
