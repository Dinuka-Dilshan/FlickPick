import SearchIcon from "@mui/icons-material/Search";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import SearchInput from "./Input";
const SearchDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleOpen = () => setIsOpen((p) => !p);

  if (isLargeScreen) {
    return null;
  }

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
        variant="temporary"
        open={isOpen}
        onClose={handleOpen}
        ModalProps={{ keepMounted: true, disableScrollLock: true }}
        anchor="bottom"
        sx={{
          "& .MuiDrawer-paper": {
            borderTopRightRadius: "20px",
            borderTopLeftRadius: "20px",
            padding: 0,
            margin: 0,
            bgcolor: "#2D2D2D",
          },
        }}
        slotProps={{ backdrop: { invisible: true } }}
      >
        <Box
          sx={{
            bgcolor: "inherit",
            height: "15vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            p: "1rem",
          }}
        >
          <SearchInput />
        </Box>
      </Drawer>
    </Box>
  );
};

export default SearchDrawer;
