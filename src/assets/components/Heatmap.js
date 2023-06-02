import React, { useEffect, useRef } from 'react';
import './Heatmap.css';
import * as d3 from 'd3';

const Heatmap = ({ filteredData }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (filteredData.length > 0) {
      const generateHeatmapChart = () => {
        const metals = Array.from(new Set(filteredData.map((item) => item['Metal 1'])));
        const names = Array.from(new Set(filteredData.map((item) => item['Name1'])));

        const margins = { top: 50, right: 50, bottom: 50, left: 200 };
        const width = 1400;
        const height = 500;

        d3.select(svgRef.current).selectAll('svg').remove();

        const svg = d3
          .select(svgRef.current)
          .append('svg')
          .attr('width', width + margins.left + margins.right)
          .attr('height', height + margins.top + margins.bottom)
          .append('g')
          .attr('transform', `translate(${margins.left}, ${margins.top})`);

        // Group the data by 'Name1' and 'Metal 1' and calculate the average pricePerKg 1
        const groupedData = names.map((name) => {
          const filteredGroup = filteredData.filter((d) => d['Name1'] === name);
          const metalValues = metals.map((metal) =>
            d3.mean(filteredGroup.filter((d) => d['Metal 1'] === metal), (d) => parseFloat(d['pricePerKg 1']))
          );
          return metals.map((metal, i) => ({
            Name1: name,
            Metal1: metal,
            pricePerKgAvg: metalValues[i],
          }));
        });

        const flatGroupedData = groupedData.flat();

        const xScale = d3
          .scaleBand()
          .range([0, width])
          .domain(names)
          .padding(0.1);

        const yScale = d3
          .scaleBand()
          .range([0, height])
          .domain(metals)
          .padding(0.1);

        svg.selectAll('rect')
          .data(flatGroupedData)
          .enter()
          .append('rect')
          .attr('x', (d) => xScale(d.Name1))
          .attr('y', (d) => yScale(d.Metal1))
          .attr('width', xScale.bandwidth())
          .attr('height', yScale.bandwidth())
          .style('font-weight', 'bold')
          .style('fill', (d) => {
            if (typeof d.pricePerKgAvg === 'undefined') {
              return '#e8e4e3';
            } else {
              const value = parseFloat(d.pricePerKgAvg);
              const metalValues = flatGroupedData
                .filter((item) => item.Metal1 === d.Metal1 && typeof item.pricePerKgAvg !== 'undefined')
                .map((item) => parseFloat(item.pricePerKgAvg));
              const minPrice = d3.min(metalValues);
              const maxPrice = d3.max(metalValues);
              const colorScale = d3
                .scaleSequential()
                .interpolator(d3.interpolateRgb('red', '#9bf582')) // Interpolate between red and light blue
                .domain([minPrice, maxPrice]);
              return colorScale(value);
            }
          })
          
          .append('title')
          .text((d) => `Average pricePerKg 1: ${d.pricePerKgAvg}`);

        svg.selectAll('.label')
          .data(flatGroupedData)
          .enter()
          .append('text')
          .attr('class', 'label')
          .attr('x', (d) => xScale(d.Name1) + xScale.bandwidth() / 2)
          .attr('y', (d) => yScale(d.Metal1) + yScale.bandwidth() / 2)
          .attr('dy', '0.35em')
          .attr('text-anchor', 'middle')
          .style('font-weight', 'bold')
          .style('padding-left', '4px')
          .text((d) => (typeof d.pricePerKgAvg !== 'undefined' ? d.pricePerKgAvg.toFixed(2) : ''));

        svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale));

        svg.append('g').call(d3.axisLeft(yScale));

        svg.append('text')
          .attr('x', width / 2)
          .attr('y', height + margins.bottom - 10)
          .attr('text-anchor', 'middle')
          .style('font-weight', 'bold')
          .style('margin-left', '10px')
          .style('font-weight', 'bold')
          .text('Scrapyards');

        svg.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', 0 - height / 2)
          .attr('y', margins.right - 200)
          .attr('dy', '24px')
          .style('font-weight', 'bold')
          .attr('text-anchor', 'middle')
          .style('font-weight', 'bold')
          .text('Metal Type');
      };

      generateHeatmapChart();
    }
  }, [filteredData]);

  return (
    <div className="heatmapi1">
      <h1 style={{ fontSize: '16px', margin: '10px', marginLeft: '30px' }}>
        Average selling prices per kg for each metal vs scrapyards
      </h1>
      {filteredData.length > 0 ? (
        <div ref={svgRef}></div>
      ) : (
        <p>No data is available for this period</p>
      )}
    </div>
  );
};

export default Heatmap;
