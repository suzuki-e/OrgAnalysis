import React from "react";
import Typography from "@material-ui/core/Typography";
import SimpleLineChart from "../../components/charts/SimpleLineChart";
import SimpleTable from "../../components/tables/SimpleTable";
import axios from "axios";
import PropTypes from "prop-types";

const ENDPOINT_BASE = process.env.REACT_APP_API_ENDPOINT_BASE;

export default class TopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupdate: {}
    };
    this.getData()
  }

  getData() {
    axios
      .get(ENDPOINT_BASE + '/message_groupdate')
      .then(results => {
        const data = results.data;
        this.setState({
          groupdate: data
        });
      });
  }

  render() {
    const {classes} = this.props;
    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          メッセージ数
        </Typography>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart
            data={this.state.groupdate.data}
            labels={this.state.groupdate.labels}/>
        </Typography>
        <Typography variant="h4" gutterBottom component="h2">
          Products
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable/>
        </div>
      </main>
    );
  }
}

TopPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

