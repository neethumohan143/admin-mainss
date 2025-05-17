import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const RestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    cuisine: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Validate image size (max 5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Image size exceeds 5MB limit.");
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("location", formData.location);
      form.append("cuisine", formData.cuisine);
      if (image) {
        form.append("image", image);
      }

      await axiosInstance.post("/restaurant/create-restaurant", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Restaurant created successfully!");
      setFormData({ name: "", location: "", cuisine: "" });
      setImage(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border border-gray-300 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a Restaurant</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Cuisine */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Cuisine</label>
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Image</label>
          <input type="file" onChange={handleImageChange} className="w-full" />
        </div>

        <button
          type="submit"
          className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RestaurantForm;
