import { TextField } from "@mui/material";
import { useCallback, useState } from "react";
import OTPInput from "react-otp-input";
import { useLocation } from "react-router-dom";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import AuthLayoutItem from "../components/AuthLayout/AuthLayoutItem";
import { useAuth } from "../hooks/useAuth";

const VerifyAccount = () => {
  const { verify, isLoading } = useAuth();
  const { state } = useLocation();

  const [otp, setOtp] = useState("");

  const verifyOtp = useCallback(
    (otp: string) => verify({ otp, userName: state.userName || "" }),
    [state.userName, verify]
  );

  return (
    <AuthLayout
      disableSubmit={isLoading || otp.length < 6}
      onSubmit={() => verifyOtp(otp)}
      submitButtonText={{
        loading: "Verifying...",
        normal: "Verify",
      }}
      subtitle={`Enter the verification code sent to ${state.userName} for verify.`}
    >
      <AuthLayoutItem>
        <OTPInput
          containerStyle={{ display: "flex", justifyContent: "space-between" }}
          value={otp}
          numInputs={6}
          onChange={(otp) => {
            setOtp(otp);
            if (otp.length === 6) {
              verifyOtp(otp);
            }
          }}
          shouldAutoFocus
          renderInput={(props) => (
            <TextField size="small" slotProps={{ htmlInput: { ...props } }} />
          )}
        />
      </AuthLayoutItem>
    </AuthLayout>
  );
};

export default VerifyAccount;
