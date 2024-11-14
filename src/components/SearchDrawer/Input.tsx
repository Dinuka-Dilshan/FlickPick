import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const SearchInput = () => {
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState(params.get("searchText") ?? "");
  const [goBackTo, setGoBackTo] = useState("");

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
      params.delete("searchText");
      setText("");
      return;
    }

    setParams({ searchText: text });
  }, [location.pathname, params, setParams, text]);

  return (
    <TextField
      fullWidth
      value={text}
      inputRef={textFieldRef}
      autoFocus
      sx={{ p: 0, margin: 0 }}
      size="small"
      onChange={handleOnChange}
      placeholder="Search Movie or Tv Show Name"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#E7E7E7" }} />
            </InputAdornment>
          ),
          style: { color: "#E7E7E7" },
        },
      }}
    />
  );
};

export default SearchInput;
