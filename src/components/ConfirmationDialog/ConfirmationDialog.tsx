import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  title: string;
  subtitle: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  isOpen: boolean;
};

const ConfirmationDialog = ({
  title,
  subtitle,
  confirmButtonText = "Cancel",
  cancelButtonText = "Accept",
  onCancel,
  onConfirm,
  isOpen,
  onClose,
}: Props) => {
  const handleCancel = () => {
    onCancel();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {subtitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
          >
            {cancelButtonText}
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleConfirm();
            }}
            autoFocus
          >
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ConfirmationDialog;
