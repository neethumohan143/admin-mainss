import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const [restData, setRestData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRestaurants = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/restaurant/all-restaurants",
      });
      const restaurants = Array.isArray(response.data.restaurants)
        ? response.data.restaurants
        : [];
      setRestData(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeRestaurant = async ({ restaurantId }) => {
    if (window.confirm("Are you sure you want to remove this restaurant?")) {
      try {
        await axiosInstance({
          method: "DELETE",
          url: `/restaurant/delete-restaurant/${restaurantId}`,
        });
        toast.success("Restaurant removed successfully");
        setRestData((prev) =>
          prev.filter((restaurant) => restaurant._id !== restaurantId)
        );
      } catch (error) {
        console.error("Error removing restaurant:", error);
        toast.error("Failed to remove restaurant");
      }
    } else {
      toast("Action canceled");
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center bg-[#0b0622] items-center h-screen">
        <span className="loading loading-dots loading-lg bg-orange-400"></span>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 p-6 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        Restaurants <span className="text-orange-500">List</span>
      </h1>

      <Link to={"/admin/create-restaurant"}>
        <button className="bg-orange-500 py-2 px-8 rounded-lg text-white font-semibold shadow-md hover:bg-orange-600 transition duration-300 mb-6">
          Create Restaurant
        </button>
      </Link>

      {restData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {restData.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                className="relative w-full h-[150px]"
                style={{
                  backgroundImage: `url(${
                    restaurant.image || "/fallback-image.jpg"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                {/* Remove Button */}
                <button
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md z-20 transition duration-300"
                  onClick={() =>
                    removeRestaurant({ restaurantId: restaurant._id })
                  }
                  title="Remove Restaurant"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* Restaurant Info */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {restaurant.name}
                </h2>
                <p className="text-sm text-gray-600">{restaurant.location}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {restaurant.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">{restaurant._id}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No restaurants found.</div>
      )}
    </main>
  );
};

export default Restaurants;
