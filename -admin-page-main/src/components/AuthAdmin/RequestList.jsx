import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getAllRequestList = async () => {
      try {
        const response = await axiosInstance.get("/request/getAllRequest");
        setRequests(response.data.requests);
      } catch (error) {
        console.log(error);
      }
    };
    getAllRequestList();
  }, []);

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4 text-center">Request List</h2>
      <div className="overflow-y-auto flex justify-center">
        <table className="w-[60rem] table-auto border-collapse border border-gray-300">
          <thead className="bg-[#0e072d] text-white">
            <tr>
              <th className="px-4 py-2 text-left font-medium">ID</th>
              <th className="px-4 py-2 text-left font-medium">Request Name</th>
              <th className="px-4 py-2 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{request._id}</td>
                  <td className="px-4 py-2">{request.ownerName}</td>
                  <td className="px-4 py-2 text-center">
                    <Link to={`/admin/req-details/${request._id}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                        View
                      </button>
                    </Link>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestList;
