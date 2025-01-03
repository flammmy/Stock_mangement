import React from "react";
import { PieChart, Pie, Cell} from "recharts";

const PieChartData = () => {
  const pieData = [
    { name: "Raj", value: 140 },
    { name: "Shayam", value: 94.5 },
    { name: "Sunder", value: 241.8 },
    { name: "Parminder", value: 280 },
  ];

  

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h3 className="text-center">Pie Chart</h3>
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



