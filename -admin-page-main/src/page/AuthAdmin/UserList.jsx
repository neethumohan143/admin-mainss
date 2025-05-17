import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const UsersList = () => {
  const [userList, setUserList] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/users-list",
      });
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  const handleRemove = async (userId) => {
    try {
      await axiosInstance.delete(`/user/remove-user/${userId}`);
      toast.success("Removed the user");
    } catch (error) {
      console.error("Error removing user:", error);
      toast.error("Removal failed");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Users List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {userList.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-5 mb-5">
              <img
                src={user.image}
                alt={user.name || "User Image"}
                className="w-16 h-16 rounded-full border border-gray-300"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              <span className="font-medium text-gray-800">Phone:</span> {user.phone}
            </p>
            <button
              onClick={() => handleRemove(user._id)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
            >
              <Trash className="w-5 h-5" />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
