import React from 'react';
import {Line} from 'react-chartjs-2';
import PropTypes from "prop-types";

const default_style = (data, labels) => ({
  labels: labels,
  datasets: [
    {
      label: 'count',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: data
    }
  ]
});

class SimpleLineChart extends React.Component {
  render() {
    const data = default_style(this.props.data, this.props.labels)
    return (
      <div>
        <Line data={data} height={400} options={{
          maintainAspectRatio: false,
          responsive: true,
        }}/>
      </div>
    );
  }
}

SimpleLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
};

export default SimpleLineChart;
