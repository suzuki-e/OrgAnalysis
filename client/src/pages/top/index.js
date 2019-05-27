import React from "react";
import Typography from "@material-ui/core/Typography";
import SimpleLineChart from "../../components/charts/SimpleLineChart";
import SimpleTable from "../../components/tables/SimpleTable";
import PropTypes from "prop-types";
import ApiClient from "../../utils/ApiClient";

export default class TopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupdate: {}
    };
  };

  componentDidMount() {
    this.getData();
  };

  getData() {
    ApiClient
      .get('/message_groupdate')
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

