import { TextField, ToggleButton, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { MdSearch, MdSettings } from "react-icons/md";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const SearchInput = () => {
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState(params.get("searchText") ?? "");
  const [goBackTo, setGoBackTo] = useState("");
  const [exact, setExact] = useState(params.get("exact") ? true : false);

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
    textFieldRef.current?.focus();
    if (location.pathname !== ROUTES.SEARCH || !text) {
      params.delete("searchText");
      setText("");
      params.delete("exact");
      setExact(false);
      return;
    }

    setParams({ searchText: text, exact: exact.toString() });
  }, [exact, location.pathname, params, setParams, text]);

  return (
    <TextField
      fullWidth
      inputRef={textFieldRef}
      value={text}
      autoFocus
      onChange={handleOnChange}
      size="small"
      placeholder="Search"
      slotProps={{
        input: {
          endAdornment: (
            <>
              <Tooltip title="Search for exact title">
                <span>
                  <ToggleButton
                    disabled={location.pathname !== ROUTES.SEARCH}
                    value={exact}
                    onChange={() => setExact((p) => !p)}
                  >
                    <MdSettings
                      size={22}
                      style={{
                        margin: 0,
                        padding: 0,
                        color: exact ? "#E75480" : "#E7E7E7",
                      }}
                    />
                  </ToggleButton>
                </span>
              </Tooltip>
              <MdSearch
                size={28}
                style={{
                  margin: 0,
                  padding: 0,
                  color: "#E7E7E7",
                }}
              />
            </>
          ),
        },
      }}
    />
  );
};

export default SearchInput;
