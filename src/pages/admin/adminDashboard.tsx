// src/pages/admin/AdminDashboard.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductManager from "./productManager";
import OrderManager from "./orderManager";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<"products" | "orders">(
    "products"
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard title="Total Products" value="156" />
        <SummaryCard title="Total Orders" value="342" />
        <SummaryCard title="Total Revenue" value="₹1,23,450" />
      </div>

      {/* Section Selector */}
      <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg max-w-md">
        <SectionButton
          active={activeSection === "products"}
          onClick={() => setActiveSection("products")}
        >
          Products
        </SectionButton>
        <SectionButton
          active={activeSection === "orders"}
          onClick={() => setActiveSection("orders")}
        >
          Orders
        </SectionButton>
      </div>

      {/* Content Area */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-4"
      >
        {activeSection === "products" ? <ProductManager /> : <OrderManager />}
      </motion.div>
    </div>
  );
};

const SummaryCard = ({ title, value }: { title: string; value: string }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-white rounded-2xl shadow p-4 border border-gray-200 hover:shadow-md transition-shadow"
  >
    <h2 className="text-sm text-gray-500">{title}</h2>
    <p className="text-xl font-semibold">{value}</p>
  </motion.div>
);

const SectionButton = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex-1 ${
      active
        ? "bg-white shadow text-gray-900"
        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
    }`}
  >
    {children}
  </button>
);

export default AdminDashboard;
