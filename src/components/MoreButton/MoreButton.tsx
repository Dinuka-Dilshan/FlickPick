import { IconButton } from "@mui/material";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";

type Props = {
  content: React.ReactNode;
};

const MoreButton = ({ content }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "more-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MdMoreVert style={{ color: "#B3B3B3" , marginRight:'-15px'}} size={24} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#1F1F1F",
            borderRadius: "12px",
            padding: "1rem",
            display: "flex",
            alignItems:'center',
          },
        }}
      >
        {content}
      </Popover>
    </div>
  );
};

export default MoreButton;
