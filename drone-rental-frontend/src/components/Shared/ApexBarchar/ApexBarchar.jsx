import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

const months = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Ago',
  'Oct',
  'Nov',
  'Dic',
];

function orderDataFromServer(totalEarnings) {
  if (totalEarnings.length > 0) {
    const categories = [];
    const seriesAux = [];
    for (let i = 0; i < totalEarnings.length; i += 1) {
      const element = totalEarnings[i];
      categories.push(`${months[element._id.month - 1]}-${element._id.year}`);
      seriesAux.push(element.amount);
    }
    // options.xaxis.categories = categories;
    // series.data = seriesAux;
    return [categories, seriesAux];
  }
  return [['No hubo ganancias'], [0]];
}

function ApexBarchar({ totalEarningsByMonths }) {
  const [dataSerie, setDataSerie] = useState([0]);
  const [category, setCategory] = useState(['No hubo ganancias']);
  useEffect(() => {
    const [categories, seriesAux] = orderDataFromServer(totalEarningsByMonths);
    setDataSerie(seriesAux);
    setCategory(categories);
  }, [totalEarningsByMonths]);

  const options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `$${val}`;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: category,
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter(val) {
          return `$${val}`;
        },
      },
    },
    title: {
      text: 'Historico de ganancias',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  };

  const series = [
    {
      name: 'Ganancia',
      data: dataSerie,
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

ApexBarchar.propTypes = {
  totalEarningsByMonths: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.shape({ month: PropTypes.number, year: PropTypes.number }),
      amount: PropTypes.number,
      count: PropTypes.number,
    }),
  ),
};
ApexBarchar.defaultProps = {
  totalEarningsByMonths: [],
};

export default ApexBarchar;
