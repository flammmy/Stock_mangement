import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

const PieChartData = () => {
<<<<<<< HEAD
  const pieData = [
    { name: "Raj", value: 140 },
    { name: "Shayam", value: 94.5 },
    { name: "Sunder", value: 241.8 },
    { name: "Parminder", value: 280 },
  ];
=======
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
>>>>>>> 321f06e344345e019e9f4fefea94bc939829ea71

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/barData`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        // Transform barData to match pie chart format
        const transformedData = response.data.data.map((item) => ({
          name: item.product_name,
          value: item.stock_in - item.stock_out, // Use the difference between stock_in and stock_out as an example
        }));

        setPieData(transformedData);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPieData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042","#FF8072","#FF8042","#FF8062","#FF8442","#FF6042","#FF8842"];

  // Render loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-center">STOCK IN</h3>
      <PieChart width={600} height={400}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default PieChartData;



