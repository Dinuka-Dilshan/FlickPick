import { useContext } from "react";
import { AuthContext } from "../modules/Auth/AuthContext/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
