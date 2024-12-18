import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

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
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#1F1F1F",
          borderRadius: "16px",
          p: "1rem 0.5rem",
        },
      }}
    >
      <Box p="1rem" display='flex' flexDirection='column' gap={1}>
        <Typography variant="h5" sx={{ color: "#FFF" }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "#FFF" }}>
          {subtitle}
        </Typography>
        <Box display="flex" gap={1} mt='1rem'>
          <Button
            fullWidth
            sx={{ p: "0.5rem 1rem" }}
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
          >
            {cancelButtonText}
          </Button>
          <Button
            fullWidth
            sx={{ p: "0.5rem 1rem" }}
            onClick={(e) => {
              e.stopPropagation();
              handleConfirm();
            }}
            autoFocus
          >
            {confirmButtonText}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
export default ConfirmationDialog;
