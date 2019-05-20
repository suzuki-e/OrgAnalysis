import React from 'react';
import {Line} from 'react-chartjs-2';

class SimpleLineChart extends React.Component {
  render() {
    return (
      <div>
        <Line data={this.props.data} height={400} options={{
          maintainAspectRatio: false,
          responsive: true,
        }}/>
      </div>
    );
  }
}

export default SimpleLineChart;
