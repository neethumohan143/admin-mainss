import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import SignupPage from "../page/SignupPage";
import LoginPage from "../page/LoginPage";
import AuthAdmin from "./protectedRoutes/AuthAdmin";
import Restaurants from "../page/AuthAdmin/Restaurants";
import UsersList from "../page/AuthAdmin/UserList";
import CreateRestaurant from "../components/AuthAdmin/CreateRestaurant";
import ProfilePage from "../page/AuthAdmin/Profile";
import EditProfile from "../page/AuthAdmin/ProfileEditePage";
import SpecialComponent from "../layout/specialComponent";
import RequestDetails from "../page/AuthAdmin/RequestDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,

    children: [
      {
        path: "/",
        element: <SpecialComponent />,
      },
      {
        path: "sign-up",
        element: <SignupPage />,
      },
      {
        path: "log-in",
        element: <LoginPage />,
      },

      {
        path: "admin",
        element: <AuthAdmin />,

        children: [
          {
            path: "restaurant-list",
            element: <Restaurants />,
          },
          {
            path: "user-list",
            element: <UsersList />,
          },
          {
            path: "create-restaurant",
            element: <CreateRestaurant />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "edite-profile",
            element: <EditProfile />,
          },
          {
            path: "req-details/:requestId",
            element: <RequestDetails />,
          },
        ],
      },
    ],
  },
]);
