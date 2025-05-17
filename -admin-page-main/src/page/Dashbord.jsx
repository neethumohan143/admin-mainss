import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import RequestList from '../components/AuthAdmin/RequestList';
import Chat from '../components/AuthAdmin/Chat';

const Dashbord = () => {
  const [userCount, setUserCount] = useState(0); 
  const [restaurantCount, setRestaurantCount] = useState(0)
  const [sellerCount, setSellerCount] = useState(0)

  const getRestaurantCount = async () => {
    try {
      const response = await axiosInstance.get("/restaurant/all-restaurants")
      setRestaurantCount(response.data.restaurants.length)
    } catch (error) {
      
    }
  }

  const getUserCount = async () => {
    try {
      const response = await axiosInstance.get('/user/users-list');
      setUserCount(response.data.length); // Assuming `response.data` is an array of users.
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const getSellerCount = async () => {
    try {
      const response = await axiosInstance.get("/seller/allSellers")
      setSellerCount(response.data.length)
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  }

  useEffect(() => {
    getUserCount();
    getRestaurantCount()
    getSellerCount()
  }, []);

  return (
    <>
    <div className='mt-3 flex justify-center gap-10 text-white'>
      <div className='flex justify-center items-center w-[350px] h-[200px] bg-[#0e072d] shadow-lg rounded-lg'>
        <h3 className='text-[20px] font-semibold'>Restaurants</h3>
      <h1 className='text-[100px] font-extrabold'>{restaurantCount}</h1>
      </div>
      <div className='flex justify-center items-center w-[350px] h-[200px] bg-[#0e072d] shadow-lg rounded-lg'>
        <h3 className='text-[20px] font-semibold'>Total Users</h3>
      <h1 className='text-[100px] font-extrabold'>{userCount}</h1>
      </div>
      <div className='flex justify-center items-center w-[350px] h-[200px] bg-[#0e072d] shadow-lg rounded-lg'>
        <h3 className='text-[20px] font-semibold'>Total Sellers</h3>
      <h1 className='text-[100px] font-extrabold'>{sellerCount}</h1>
      </div>
    </div>
    <RequestList />
    <Chat />
    </>
  );
};

export default Dashbord;
