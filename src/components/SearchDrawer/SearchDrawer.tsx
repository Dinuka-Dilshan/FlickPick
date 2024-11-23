import CloseIcon from "@mui/icons-material/CloseOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import SearchDrawerContent from "./SearchDrawerContent";
const SearchDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  if (isLargeScreen) {
    return null;
  }

  const handleOpen = () => setIsOpen((p) => !p);

  return (
    <Box>
      <Fab
        onClick={handleOpen}
        size="medium"
        sx={{ position: "fixed", bottom: "3%", right: "5%" }}
      >
        <SearchIcon />
      </Fab>
      <Drawer
        disableRestoreFocus
        variant="temporary"
        open={isOpen}
        onClose={handleOpen}
        ModalProps={{ keepMounted: true }}
        anchor="bottom"
        sx={{
          "& .MuiDrawer-paper": {
            padding: 0,
            margin: 0,
            bgcolor: "#2D2D2D",
          },
        }}
      >
        <Fab
          onClick={handleOpen}
          size="medium"
          sx={{ position: "fixed", bottom: "3%", right: "5%" }}
        >
          <CloseIcon />
        </Fab>
        <SearchDrawerContent onDrawerClose={handleOpen} />
      </Drawer>
    </Box>
  );
};

export default SearchDrawer;
