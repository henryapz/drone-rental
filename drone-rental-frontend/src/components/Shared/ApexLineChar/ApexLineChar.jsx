import React from 'react';
import ReactApexChart from 'react-apexcharts';

function ApexLineChar() {
  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Número de Pedidos',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  };

  const series = [
    {
      name: 'Pedidos',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}

export default ApexLineChar;
