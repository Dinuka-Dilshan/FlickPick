import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const SearchInput = () => {
  const [isClickedOutside, setIsClickedOutside] = useState(true);
  const [text, setText] = useState("");
  const iconRef = useRef<SVGSVGElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleClickOutSide = useCallback(
    (e: MouseEvent) => {
      if (
        !iconRef.current?.contains(e.target as Node) &&
        !textFieldRef.current?.contains(e.target as Node) &&
        text.length === 0
      ) {
        setIsClickedOutside(true);
      }
    },
    [text.length]
  );

  const handleClickInside = () => {
    setIsClickedOutside(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [handleClickOutSide]);

  return (
    <>
      {isClickedOutside && (
        <SearchIcon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          component={motion.svg}
          ref={iconRef}
          onClick={handleClickInside}
          sx={{ m: 0, p: 0 }}
        />
      )}

      {!isClickedOutside && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <TextField
            value={text}
            inputRef={textFieldRef}
            sx={{ p: 0, margin: 0 }}
            size="small"
            onChange={(e) => setText(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default SearchInput;
