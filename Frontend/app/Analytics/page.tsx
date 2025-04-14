"use client";

import { BarChart, PieChart, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Bar, Line, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

const Progress = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

const salesData = [
  { name: "Jan", revenue: 4000, profit: 2400, loss: 500 },
  { name: "Feb", revenue: 3000, profit: 1398, loss: 700 },
  { name: "Mar", revenue: 5000, profit: 2800, loss: 600 },
  { name: "Apr", revenue: 4500, profit: 2200, loss: 800 },
];

const growthData = [
  { name: "Week 1", sales: 1500 },
  { name: "Week 2", sales: 2300 },
  { name: "Week 3", sales: 2800 },
  { name: "Week 4", sales: 3500 },
];

const initialProductData = [
  { name: "Product A", sold: 400, remaining: 200, profit: 300, loss: 50 },
  { name: "Product B", sold: 300, remaining: 100, profit: 250, loss: 30 },
  { name: "Product C", sold: 500, remaining: 50, profit: 400, loss: 20 },
];

export default function AnalyticsPage() {
  const [productData, setProductData] = useState(initialProductData);

  const restockItem = (productName) => {
    setProductData((prevData) =>
      prevData.map((item) =>
        item.name === productName ? { ...item, remaining: item.remaining + 100 } : item
      )
    );
  };

  const lowStock = productData.filter((item) => item.remaining < 100);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold text-blue-700">E-commerce Analytics</h1>
        <p className="text-lg text-gray-600 mt-2">Gain insights into your sales, stock, and profitability.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-4 bg-white rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Revenue & Profit Trends</h3>
          <p className="text-sm text-gray-500 mb-4">Track revenue, profit, and losses over time.</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
              <Line type="monotone" dataKey="loss" stroke="#ff6b6b" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Stock Distribution</h3>
          <p className="text-sm text-gray-500 mb-4">Visual representation of remaining stock.</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={productData} dataKey="remaining" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-4 bg-white rounded-2xl shadow-lg mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Sales Growth</h3>
        <p className="text-sm text-gray-500 mb-4">Monitor weekly sales progress.</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={growthData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Low Stock Alerts</h3>
        <p className="text-sm text-gray-500 mb-4">Products that need restocking.</p>
        {lowStock.length > 0 ? (
          lowStock.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-yellow-100 rounded-xl shadow-md mb-2">
              <AlertTriangle className="text-yellow-700" />
              <p className="text-sm text-gray-800">{item.name} is running low! Only {item.remaining} left.</p>
              <button onClick={() => restockItem(item.name)} className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">Restock</button>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-4 p-4 bg-green-100 rounded-xl shadow-md">
            <CheckCircle className="text-green-700" />
            <p className="text-sm text-gray-800">All products are sufficiently stocked.</p>
          </div>
        )}
      </div>
    </div>
  );
}
