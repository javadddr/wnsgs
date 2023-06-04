import Footer from './Footer';
import Navbar from './Navbar';

import "./Dash.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis,  Tooltip, Legend, LineChart, Line,PieChart,Pie,LabelList,ReferenceLine,Cell,ResponsiveContainer} from 'recharts';

import Heatmap from './Heatmap';
import Heatmapcar from './Heatmapcar';
import Heatmapscrap from './Heatmapscrap';




const Dash = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
console.log(data)
  useEffect(() => {
    fetchData();
    
  }, []);

 const moment = require('moment');

const fetchData = async () => {
  try {
    const response = await axios.get('https://invoice-fgq4.onrender.com/data');
    const formattedData = response.data.map(item => ({
      ...item,
      dateselected: moment(item.dateselected).format('YYYY-MM-DD')
    }));
    setData(formattedData);
  } catch (error) {
    console.error(error);
  }
};

 

  const handleButtonClick = (period) => {
    let filteredResult = [];
  
    const currentDate = new Date();
  
    switch (period) {
      case 'thisMonth':
        filteredResult = data.filter((item) => {
          const itemDate = new Date(item.dateselected);
          return itemDate.getMonth() === currentDate.getMonth() && itemDate.getFullYear() === currentDate.getFullYear();
        });
        break;
      case 'lastMonth':
        const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        filteredResult = data.filter((item) => {
          const itemDate = new Date(item.dateselected);
          return itemDate.getMonth() === lastMonthDate.getMonth() && itemDate.getFullYear() === lastMonthDate.getFullYear();
        });
        break;
      case 'thisQuarter':
        const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3); // Calculate current quarter (1, 2, 3, or 4)
        filteredResult = data.filter((item) => {
          const itemDate = new Date(item.dateselected);
          const itemQuarter = Math.floor((itemDate.getMonth() + 3) / 3); // Calculate quarter of the item
          return itemQuarter === currentQuarter && itemDate.getFullYear() === currentDate.getFullYear();
        });
        break;
      case 'lastQuarter':
        const lastQuarter = Math.floor((currentDate.getMonth() + 3) / 3) - 1; // Calculate last quarter (1, 2, 3, or 4)
        filteredResult = data.filter((item) => {
          const itemDate = new Date(item.dateselected);
          const itemQuarter = Math.floor((itemDate.getMonth() + 3) / 3); // Calculate quarter of the item
          return itemQuarter === lastQuarter && itemDate.getFullYear() === currentDate.getFullYear();
        });
        break;
      case 'thisYear':
        filteredResult = data.filter((item) => {
          const itemDate = new Date(item.dateselected);
          return itemDate.getFullYear() === currentDate.getFullYear();
        });
        break;
      case 'lastYear':
        const lastYear = currentDate.getFullYear() - 1;
        filteredResult = data.filter((item) => {
          const itemDate = new Date(item.dateselected);
          return itemDate.getFullYear() === lastYear;
        });
        break;
      case 'all':
        filteredResult = data;
        break;
      default:
        filteredResult = data;
    }
  
    setFilteredData(filteredResult);
    setActiveButton(period);
  };
  
  useEffect(() => {
    handleButtonClick('all')
    
  }, [data]);
  const prepareBarChartData = () => {
    // Create an object to store the sum of 'kg 1' for each 'Name1'
    const sumByNames = {};

    // Iterate through the data and calculate the sum
    filteredData.forEach((item) => {
      const name = item.Name1;
      const kg1 = item['kg 1'];

      if (sumByNames[name]) {
        sumByNames[name] += kg1;
      } else {
        sumByNames[name] = kg1;
      }
    });

    // Transform the object into an array of objects
    const chartData = Object.keys(sumByNames).map((name) => ({
      Name1: name,
      Total_kg: sumByNames[name],
    }));

    return chartData;
  };

  
  const prepareBarChartData2 = () => {
    // Create an object to store the sum of 'kg 1' for each 'Name1'
    const sumByNames = {};

    // Iterate through the data and calculate the sum
    filteredData.forEach((item) => {
      const name = item.Name2;
      const kg1 = item['kg 1'];

      if (sumByNames[name]) {
        sumByNames[name] += kg1;
      } else {
        sumByNames[name] = kg1;
      }
    });

    // Transform the object into an array of objects
    const chartData = Object.keys(sumByNames).map((name) => ({
      Name2: name,
      Total_kg: sumByNames[name],
    }));

    return chartData;
  };

  



  const preparePieChartData = () => {
    const sumByNames = {};

    // Iterate through the data and calculate the sum
    filteredData.forEach((item) => {
      const name = item.Name2;
      const kg1 = item['totalPrice 1'];
      
      if (sumByNames[name]) {
        sumByNames[name] += kg1;
      } else {
        sumByNames[name] = kg1;
      }
    });

    // Transform the object into an array of objects
    const chartData = Object.keys(sumByNames).map((name) => ({
      Name2: name,
      Sum: sumByNames[name],
    }));

    return chartData;
  };



  const preparePieChartData2 = () => {
    // Create an object to store the sum of 'kg 1' for each 'Name2'
    const sumByNames = {};

    // Iterate through the data and calculate the sum
    filteredData.forEach((item) => {
      const name = item.Name1;
      const kg1 = item['totalPrice 1'];
      
      if (sumByNames[name]) {
        sumByNames[name] += kg1;
      } else {
        sumByNames[name] = kg1;
      }
    });

    // Transform the object into an array of objects
    const chartData = Object.keys(sumByNames).map((name) => ({
      Name1: name,
      Sum: sumByNames[name],
      
    }));
    
    return chartData;
   
  };

  

  const prepareLineChartData = () => {
    // Create an object to store the sums and averages for each week number
    const sumByWeek = {};
    const sum2ByWeek = {};
    const avgByWeek = {};
  
    // Iterate through the data and calculate the sums and averages
    filteredData.forEach((item) => {
      const weekNumber = item.weekNumber;
      const totalPrice = item['totalPrice 1'];
      const pricePerKg = item['kg 1'];
  
      if (sumByWeek[weekNumber]) {
        sumByWeek[weekNumber] += totalPrice;
      } else {
        sumByWeek[weekNumber] = totalPrice;
      }
  
      if (sum2ByWeek[weekNumber]) {
        sum2ByWeek[weekNumber] += pricePerKg;
      } else {
        sum2ByWeek[weekNumber] = pricePerKg;
      }
    });
  
    // Calculate the averages for each week number
    Object.keys(sumByWeek).forEach((weekNumber) => {
      const avg = sumByWeek[weekNumber] / sum2ByWeek[weekNumber];
      avgByWeek[weekNumber] = Math.round(avg * 10) / 10;
    });
  
    // Transform the objects into an array of objects
    const chartData = Object.keys(sumByWeek).map((weekNumber) => ({
      'Week Number': weekNumber,
      Total_Revenue: sumByWeek[weekNumber].toFixed(0),
      Total_kg: sum2ByWeek[weekNumber],
      Avg_KgEur: avgByWeek[weekNumber],
    }));
  
    // Sort the chartData array by Week Number in ascending order
    chartData.sort((a, b) => a['Week Number'] - b['Week Number']);
  
    return chartData;
  };
  
  
  
  const [showTotalKgLine, setShowTotalKgLine] = useState(true);
const [showAvgKgEurLine, setShowAvgKgEurLine] = useState(true);

const handleLineMouseEnter = (dataKey) => {
  if (dataKey === 'Total_Revenue') {
    setShowTotalKgLine(false);
    setShowAvgKgEurLine(false);
  }
};

const handleLineMouseLeave = () => {
  setShowTotalKgLine(true);
  setShowAvgKgEurLine(true);
};
  

  const barChartData = prepareBarChartData();
  const barChartData2 = prepareBarChartData2();
  const pieChartData = preparePieChartData();
  const lineChartData = prepareLineChartData();
  const pieChartData2 = preparePieChartData2();


  const CustomizedLabel = ({ x, y, value }) => {
    return (
      <text x={x} y={y} dy={-10} fill="#8884d8" fontSize={12} textAnchor="middle">
        {value}
      </text>
    );
  };

  const colorMapping = {};

  pieChartData.forEach((dataPoint, index) => {
    // Assign a color to each name
    colorMapping[dataPoint.Name2] = `hsl(${(index * 50) % 360}, 70%, 50%)`;
  });
  const colorMapping2 = {};

  pieChartData2.forEach((dataPoint, index) => {
    // Assign a color to each name
    colorMapping2[dataPoint.Name1] = `hsl(${(index * 50) % 360}, 70%, 50%)`;
  });



  const uniqueDates = [...new Set(filteredData.map((item) => item.weekNumber))].sort((a, b) => a - b);


  // Get all unique categories
  const allCategories = [...new Set(filteredData.map((item) => item['Metal 1']))];
  
  const chartDatai = uniqueDates.map((weekNumber) => {
    const filteredByWeek = filteredData.filter((item) => item.weekNumber === weekNumber);
    const categories = allCategories.map((category) => {
      const item = filteredByWeek.find((item) => item['Metal 1'] === category);
      return item ? item['Metal 1'] : category;
    });
    const amounts = categories.map((category) => {
      const item = filteredByWeek.find((item) => item['Metal 1'] === category);
      return item ? item['kg 1'] : 0;
    });
  
    return {
      weekNumber,
      categories,
      amounts,
    };
  });
  
  
  let colorMappingo = {};
  if (chartDatai.length > 0) {
    colorMappingo = chartDatai[0].categories.reduce((mapping, category, index) => {
      mapping[category] = `hsl(${(index * 50) % 360}, 70%, 50%)`;
      return mapping;
    }, {});
  }
  



  

  return (
    <div className='koli'>





<div className='Filter'>
      <button
        className={activeButton === 'thisMonth' ? 'active' : ''}
        onClick={() => handleButtonClick('thisMonth')}
      >
        This Month
      </button>
      <button
        className={activeButton === 'lastMonth' ? 'active' : ''}
        onClick={() => handleButtonClick('lastMonth')}
      >
        Last Month
      </button>
      <button
        className={activeButton === 'thisQuarter' ? 'active' : ''}
        onClick={() => handleButtonClick('thisQuarter')}
      >
        This Quarter
      </button>
      <button
        className={activeButton === 'lastQuarter' ? 'active' : ''}
        onClick={() => handleButtonClick('lastQuarter')}
      >
        Last Quarter
      </button>
      <button
        className={activeButton === 'thisYear' ? 'active' : ''}
        onClick={() => handleButtonClick('thisYear')}
      >
        This Year
      </button>
      <button
        className={activeButton === 'lastYear' ? 'active' : ''}
        onClick={() => handleButtonClick('lastYear')}
      >
        Last Year
      </button>
      <button
        className={activeButton === 'all' ? 'active' : ''}
        onClick={() => handleButtonClick('all')}
      >
        All
      </button>
    </div>








      <Navbar/>
      <Heatmap   filteredData={filteredData} />
      <Heatmapscrap filteredData={filteredData}/>
      <div >
        <div className='twobars'>
        <div className='bar1'>
          <h3 style={{color: 'rgb(48, 0, 238)',marginLeft:'50px' }}>Total_kg/Scrapyard</h3>
          <BarChart width={740} height={500} data={barChartData} style={{ border: '1px solid black', borderRadius: '18px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', padding: '25px', backgroundColor: 'rgb(255, 255, 255)', margin: '40px' }}>
  <XAxis dataKey="Name1" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="Total_kg" fill="#8884d8">
    <LabelList dataKey="Total_kg" position="top" fill="black" fontWeight="bold" />
  </Bar>
</BarChart>
        </div>
        <div className='bar2'>
          <h3 style={{color: 'rgb(48, 0, 238)',marginLeft:'50px'}}>Total_kg/Beevans</h3>
          <BarChart width={740} height={500} data={barChartData2} style={{ border: '1px solid black', borderRadius: '18px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', padding: '25px', backgroundColor: 'rgb(255, 255, 255)', margin: '40px' }}>
  <XAxis dataKey="Name2" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="Total_kg" fill="#34eb86">
    <LabelList dataKey="Total_kg" position="top" fill="black" fontWeight="bold" />
  </Bar>
</BarChart>
        </div>
        </div>

        <div className='twopie'>
           <div className='pie2'>
          <h3 style={{color: 'rgb(48, 0, 238)' }}>Total_Revenue/Scrapyard</h3>
        
          <PieChart width={700} height={600} style={{ border: '1px solid black', borderRadius: '18px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', padding: '25px', backgroundColor: 'rgb(255, 255, 255)', margin: '10px' }}>
  <Pie
    data={pieChartData2}
    dataKey="Sum"
    nameKey="Name1"
    cx="50%"
    cy="50%"
    outerRadius={220}
    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
      const RADIAN = Math.PI / 180;
      const radius = outerRadius + 30;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {`${pieChartData2[index].Name1}: ${value.toFixed(2)}`}
        </text>
      );
    }}
    labelLine={true}
  >
    {pieChartData2.map((entry) => (
      <Cell key={entry.Name1} fill={colorMapping2[entry.Name1]} />
    ))}
  </Pie>
  <Tooltip formatter={(value) => value.toFixed(2)} />
  <Legend />
</PieChart>
        </div>
        <div className='pie1'>
      <h3 style={{color: 'rgb(48, 0, 238)' }}>Total_Revenue/Beevans</h3>
   
<PieChart width={700} height={600} style={{ border: '1px solid black', borderRadius: '18px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', padding: '25px', backgroundColor: 'rgb(255, 255, 255)', margin: '10px' }}>
  <Pie
    data={pieChartData}
    dataKey="Sum"
    nameKey="Name2"
    cx="50%"
    cy="50%"
    outerRadius={220}
    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
      const RADIAN = Math.PI / 180;
      const radius = outerRadius + 30;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {`${pieChartData[index].Name2}: ${value.toFixed(2)}`}
        </text>
      );
    }}
    labelLine={true}
  >
    {pieChartData.map((entry) => (
      <Cell key={entry.Name2} fill={colorMapping[entry.Name2]} />
    ))}
  </Pie>
  <Tooltip formatter={(value) => value.toFixed(2)} />
  <Legend />
</PieChart>
    </div>
       
      </div>
      </div>

      <div className='lin'>
      





  <h3>Revenue, kg and Average kg/euro</h3>
  <LineChart width={1600} height={400} data={prepareLineChartData()} marginLeft={300} style={{ borderRadius: '18px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', padding: '25px', margin: '10px' }}>
 
  
  <XAxis dataKey="Week Number" />
  <YAxis padding={{ top: 20, bottom: 10 , right: 30}} />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="Total_Revenue" stroke="#8884d8" onMouseEnter={handleLineMouseEnter} onMouseLeave={handleLineMouseLeave}>
      <LabelList content={<CustomizedLabel dataKey="Total_Revenue" fontWeight="bold" />} />
    </Line>
    {showTotalKgLine && (
      <Line type="monotone" dataKey="Total_kg" stroke="#82ca9d">
        <LabelList content={<CustomizedLabel dataKey="Total_kg" fontWeight="bold"/>} />
      </Line>
    )}
    {showAvgKgEurLine && (
      <Line type="monotone" dataKey="Avg_KgEur" stroke="#ffc658" >
        <LabelList content={<CustomizedLabel dataKey="Avg_KgEur" fontWeight="bold" />} />
      </Line>
    )}
  </LineChart>
</div>
{uniqueDates.length !== 0 ? (
  <div className='stackichart'>
    <h2 className='tstack'>Metals collected vs Type</h2>
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={chartDatai}>
        <XAxis dataKey="weekNumber" />
        <YAxis />
        <Tooltip
          content={({ payload, label, active }) => {
            if (active && payload && payload.length) {
              // Filter out entries with a value of 0
              const filteredPayload = payload.filter((entry) => entry.value !== 0);
              if (filteredPayload.length) {
                // Render the Tooltip only if there are non-zero entries
                return (
                  <div className="custom-tooltip" style={{ backgroundColor: 'white', paddingLeft: '10', border: '1px solid black' }}>
                    <p>{label}</p>
                    {filteredPayload.map((entry, index) => (
                      <p key={index} style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                      </p>
                    ))}
                  </div>
                );
              }
            }
            return null;
          }}
        />
        <Legend fontWeight="bold" />
        {chartDatai[0].categories.map((category, index) => (
          <Bar
            key={category}
            dataKey={`amounts[${index}]`}
            stackId="stack"
            name={category}
            fill={colorMappingo[category]}
          >
            <LabelList position="top" fontWeight="small" fill="black" />
          </Bar>
        ))}
        <Bar
          dataKey="total"
          stackId="stack"
          fill="none"
          isAnimationActive={false}
          label={{
            position: 'top',
            fill: 'black',
            fontWeight: 'bold',
            content: ({ payload }) => payload && payload.value !== 0 ? payload.value : null
          }}
        />
        {uniqueDates.map((date, index) => (
          <text
            key={`total-label-${index}`}
            x={index * (100 / (uniqueDates.length - 1))}
            y={chartDatai[index].total > 0 ? -10 : 10}
            dy={chartDatai[index].total > 0 ? 0 : 16}
            fill="#000"
            textAnchor="middle"
          >
            {chartDatai[index].total}
          </text>
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
) : (
  <div>No data available</div>
)}






<Heatmapcar filteredData={filteredData}/>


{/* <DataSubmittedSoFar filteredData={filteredData} fetchData={fetchData}/> */}

    

<Footer/>
    </div>
  );
};

export default Dash;

