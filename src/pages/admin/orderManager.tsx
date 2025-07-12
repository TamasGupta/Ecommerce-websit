// src/pages/admin/OrderManager.tsx
"use client";

import React, { useState, useEffect } from "react";
import { FiEye, FiTruck } from "react-icons/fi";
import { motion } from "framer-motion";

type Order = {
  _id: string;
  orderNumber: string;
  customer: string;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
};

const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API call
        // const data = await getAllOrders();
        // setOrders(data);

        // Mock data for demonstration
        setOrders([
          {
            _id: "1",
            orderNumber: "ORD-12345",
            customer: "John Doe",
            date: "2023-05-15",
            status: "processing",
            total: 4599,
            items: [
              { product: "Premium Headphones", quantity: 1, price: 2999 },
              { product: "Wireless Mouse", quantity: 2, price: 800 },
            ],
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      setIsLoading(true);
      // Replace with your actual API call
      // await updateOrderStatus(orderId, newStatus);
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>

      {isLoading && orders.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order._id, "completed")}
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                      disabled={order.status === "completed" || isLoading}
                    >
                      <FiTruck />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">
                  Order #{selectedOrder.orderNumber}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(selectedOrder.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Customer Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>{selectedOrder.customer}</p>
                  {/* Add more customer details as needed */}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Order Summary</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-gray-200"
                    >
                      <div>
                        <p>{item.product}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p>₹{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                  <div className="flex justify-between font-medium pt-2">
                    <p>Total</p>
                    <p>₹{selectedOrder.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrderManager;
