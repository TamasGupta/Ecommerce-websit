import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, logoutUser } from "../../action/userApis";
import Shimmer from "../../components/shimmerLoaders";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Order {
  _id: string;
  date: string;
  total: number;
}

interface User {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: Address;
  orders?: Order[];
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        if (res.status == 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // navigate("/login");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  if (!user)
    return (
      <div className="p-5">
        <Shimmer.Profile />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Hii! {user?.name}</h1>

      {/* User Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-6">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600 text-sm">{user?.email}</p>
            {user?.phone && <p className="text-gray-600">{user?.phone}</p>}
            <button
              onClick={() => navigate("/profile/edit")}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
        {user?.address ? (
          <p className="text-gray-700">
            {user.address?.street}, {user.address.city}, {user.address.state},{" "}
            {user.address.zip}
          </p>
        ) : (
          <p className="text-gray-500">No address saved.</p>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
        {user.orders && user.orders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {user.orders.slice(0, 3).map((order) => (
              <li key={order._id} className="py-2 flex justify-between">
                <div>
                  <p className="text-sm font-medium">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <p className="text-sm font-semibold text-green-600">
                  ₹{order.total}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="text-red-600 text-sm hover:underline"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
