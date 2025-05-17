import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { Send } from "lucide-react"; // Import the send icon from Lucide
import toast from "react-hot-toast";

const RequestDetails = () => {
  const { requestId } = useParams(); // Extract 'requestId' from URL
  const [requestDetails, setRequestDetails] = useState(null);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // useForm hooks
  const [email, setEmail] = useState(null);

  console.log(email);
  useEffect(() => {
    const getDetailsRequest = async () => {
      try {
        const response = await axiosInstance.get(
          `/request/getRequestById/${requestId}`
        );
        console.log(response, "==response");
        setRequestDetails(response.data.request); // Save the response data in state
        setEmail(response.data.request.email);
      } catch (error) {
        setError("Failed to fetch request details");
        console.error(error);
      }
    };

    if (requestId) {
      getDetailsRequest();
    }
  }, [requestId]);

  const handleApprove = async () => {
    try {
      const response = await axiosInstance.put(`/request/update/status/`, {
        requestId,
        status: "approved",
      });
      console.log(response, "==approve response");
    } catch (error) {
      console.error("Error approving request", error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axiosInstance.put(`/request/update/status/`, {
        requestId,
        status: "rejected",
      });
      console.log(response, "==reject response");
    } catch (error) {
      console.error("Error rejecting request", error);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Include the email in the form data
      const response = await axiosInstance.post("/request/send-join-link", {
        ...data,
        email,
      });
      toast.success("The join link sended");
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to send the link");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!requestDetails) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Request Details
      </h2>
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-medium text-gray-600">
              Restaurant Name:
            </p>
            <p className="text-gray-800">{requestDetails.restaurantName}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Owner Name:</p>
            <p className="text-gray-800">{requestDetails.ownerName}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Cuisine:</p>
            <p className="text-gray-800">{requestDetails.cuisine}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Email:</p>
            <p className="text-gray-800">{requestDetails.email}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Location:</p>
            <p className="text-gray-800">{requestDetails.location}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Phone:</p>
            <p className="text-gray-800">{requestDetails.phone}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Status:</p>
            <p className="text-gray-800">{requestDetails.status}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Created At:</p>
            <p className="text-gray-800">
              {new Date(requestDetails.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-600">Updated At:</p>
            <p className="text-gray-800">
              {new Date(requestDetails.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={handleApprove}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 transform hover:scale-105 text-sm"
          >
            Approve
          </button>
          <button
            onClick={handleReject}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 transform hover:scale-105 text-sm"
          >
            Reject
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="flex justify-center items-center gap-4">
          <input
            placeholder="Enter restaurant ID"
            id="restaurantId"
            type="text"
            {...register("restaurantId", {
              required: "Restaurant ID is required",
            })}
            className="w-full sm:w-[500px] py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.restaurantId && (
            <p className="text-red-500 text-sm">
              {errors.restaurantId.message}
            </p>
          )}

          <button
            type="submit"
            className="flex items-center justify-center px-6 py-2 bg-orange-500 text-white font-medium text-sm rounded-lg hover:bg-orange-600 focus:outline-none transition duration-200 transform hover:scale-105"
          >
            <Send size={18} className="mr-2" /> {/* Lucide send icon */}
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestDetails;
