import React, { useEffect, useState } from "react";
import UnAuthSidebar from "../components/UnAuthSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearAdmin, saveAdmin } from "../redux/features/adminSlice";
import AuthSidebar from "../components/AuthAdmin/AuthSidebar";

const AdminLayout = () => {
  const { isAdminExist } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const checkAdmin = async () => {
    try {
      await axiosInstance({
        method: "GET",
        url: "/admin/check-admin",
      });
      dispatch(saveAdmin());
    } catch (error) {
      dispatch(clearAdmin());
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after checking user
    }
  };
  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg bg-orange-400"></span>
      </div>
    );
  }
  return (
    <div className="flex h-screen">
      {isAdminExist ? (
        <div className="sticky top-0 w-64 bg-white shadow-lg">
          <AuthSidebar />
        </div>
      ) : (
        ""
      )}
      {/* Main Content Section */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
