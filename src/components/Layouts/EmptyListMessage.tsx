import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

type Props = {
  itemList: unknown[] | undefined | null;
  isLoading: boolean;
  message: string;
  actionLabel: string;
  action: () => void;
};

const EmptyListMessage = ({
  isLoading,
  itemList,
  message,
  actionLabel,
  action,
}: Props) => {
  if (isLoading || itemList?.length !== 0) {
    return null;
  }

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Typography
        component={motion.span}
        animate={{
          y: [0, -10, 0],
          transition: {
            repeat: Infinity,
            duration: 1,
          },
        }}
        sx={{ color: "#EFEFEF", fontSize: "1.3rem", textAlign: "center" }}
      >
        {message}
      </Typography>

      {actionLabel && (
        <Button variant="outlined" onClick={action}>
          <Typography
            sx={{
              background:
                "linear-gradient(to right, #ffcc00, #ff4d4d, #ff66b3)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {actionLabel}
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default EmptyListMessage;
