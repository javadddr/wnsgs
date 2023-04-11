import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis,  Tooltip,Legend} from 'recharts';
import Footer from './Footer';
import Navbar from './Navbar';

import "./Dash.css"

import data from './data';


function Dash() {
  const [myData, setMyData] = useState([]);
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    // Sort the data by date
    data.sort((a, b) => new Date(a.dateselected) - new Date(b.dateselected));
    setMyData(data);
  }, []);

  useEffect(() => {
    setChartData(myData);
  }, []);
  const formatDataForBarChart = (data) => {
    return data.map((item) => {
      return {
        name: item.dateselected,
        value: parseFloat(item.totalPrice)
      };
    });
  };
  
  
  


  return (

   <div className='dash'>
    
    <Navbar/>
    <h1>it is under construction, Please Go back Home!</h1>
    <StackedBarChart/>
    <div className='footeridash'>
    <Footer/>
    </div>

    
   </div>
  );
  
}

export default Dash;


function StackedBarChart() {
  // Transform the data to the format needed by the stacked bar chart
  const chartData = data.map((item) => {
    const { dateselected, nonEmptyRows } = item;
    const chartItem = { date: new Date(dateselected) };

    nonEmptyRows.forEach((row) => {
      const { metalType, kg } = row;
      chartItem[metalType] = parseFloat(kg);
    });

    return chartItem;
  });

  // Determine the unique metal types from the data
  const metalTypes = data
    .flatMap((item) => item.nonEmptyRows.map((row) => row.metalType))
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div>
    <BarChart width={800} height={400} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {metalTypes.map((metalType, index) => (
        <Bar key={index} dataKey={metalType} stackId="a" fill={`#${((1 << 24) * Math.random() | 0).toString(16)}`} />
      ))}
    </BarChart>

    </div>
    
  );
}