import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useState } from "react";

const PasswordInput = (props: TextFieldProps) => {
  const [show, setShow] = useState(false);

  const handleClickShowPassword = () => setShow((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <TextField
      {...props}
      type={show ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={show ? "hide the password" : "display the password"}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordInput;
