import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const BarChartData = () => {
<<<<<<< HEAD
  const barData = [
    { name: '5505', uv: 140, pv: 20000, amt: 200 },
    { name: '8600', uv: 94.5, pv: 20000, amt: 200 },
    { name: '3004', uv: 241.8, pv: 60000, amt: 300 },
    { name: '5444', uv: 280, pv: 80000, amt: 400 }
  ];
=======
  const [barData, setBarData] = useState([]); // State to hold bar chart data
  const [loading, setLoading] = useState(true); // State for loading status
>>>>>>> 321f06e344345e019e9f4fefea94bc939829ea71

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/barData`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setBarData(response.data.data); // Bind the API response to the barData state
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  // Render a loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-center">STOCK SALES</h3>
      <BarChart width={500} height={400} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product_name" /> {/* Use key from API response */}
        <YAxis />
        <Tooltip
          formatter={(value, name, props) => {
            const shadeNo = props.payload?.product_shadeNo || 'N/A';
            return [`${value} (${shadeNo})`, name];
          }}
        />
        <Tooltip />
        <Bar dataKey="stock_in" fill="#8884d8" /> {/* Key for stock_in */}
        <Bar dataKey="stock_out" fill="#82ca9d" /> {/* Key for stock_out */}
      </BarChart>
    </div>
  );
};

export default BarChartData;

