import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AuthAdmin = () => {
  const { isAdminExist } = useSelector((state) => state.admin);
  console.log(isAdminExist);
  const navigate = useNavigate();

  if (!isAdminExist) {
    navigate("/log-in");
  }

  return isAdminExist ? <Outlet /> : null;
};

export default AuthAdmin;
