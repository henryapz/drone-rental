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
      categories.push(`${months[element._id.month - 1]}`);
      seriesAux.push(element.count);
    }
    // options.xaxis.categories = categories;
    // series.data = seriesAux;
    return [categories, seriesAux];
  }
  return [['No hubo ganancias'], [0]];
}

function ApexLineChar({ totalEarningsByMonths }) {
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
      categories: category,
    },
    yaxis: {
      min: 0,
      tickAmount: 1,
    },
  };

  const series = [
    {
      name: 'Pedidos',
      data: dataSerie,
    },
  ];
  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}

ApexLineChar.propTypes = {
  totalEarningsByMonths: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.shape({ month: PropTypes.number, year: PropTypes.number }),
      amount: PropTypes.number,
      count: PropTypes.number,
    }),
  ),
};
ApexLineChar.defaultProps = {
  totalEarningsByMonths: [],
};

export default ApexLineChar;
