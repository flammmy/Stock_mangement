// import React from 'react';
// import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// const BarChartData = () => {
//   const barData = [
//     { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//     { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//     { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
//     { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 }
//   ];

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <div>
//       <h3 className='text-center'>Bar Chart</h3>
//       <BarChart width={500} height={400} data={barData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="uv" fill="#8884d8" />
//         <Bar dataKey="pv" fill="#82ca9d" />
//       </BarChart>
//     </div>
//   );
// };

// export default BarChartData;


import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const BarChartData = () => {
  const barData = [
    { name: '5505', uv: 140, pv: 20000, amt: 200 },
    { name: '8600', uv: 94.5, pv: 20000, amt: 200 },
    { name: '3004', uv: 241.8, pv: 60000, amt: 300 },
    { name: '5444', uv: 280, pv: 80000, amt: 400 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h3 className='text-center'>Bar Chart</h3>
      <BarChart width={500} height={400} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="uv" fill="#8884d8" />
        <Bar dataKey="pv" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default BarChartData;

