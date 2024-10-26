import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const SearchInput = () => {
  const [isClickedOutside, setIsClickedOutside] = useState(true);
  const iconRef = useRef<SVGSVGElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState(params.get("searchText") ?? "");
  const [goBackTo, setGoBackTo] = useState("");

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

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (location.pathname !== ROUTES.SEARCH) {
      setGoBackTo(location.pathname);
    }
    setText(e.target.value);
    if (!e.target.value) {
      navigate(goBackTo);
    } else {
      navigate(ROUTES.SEARCH);
    }
  };

  useEffect(() => {
    if (location.pathname !== ROUTES.SEARCH || !text) {
      return;
    }

    setParams({ searchText: text });
  }, [location.pathname, setParams, text]);

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
            onChange={handleOnChange}
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
