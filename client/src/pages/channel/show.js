import React from "react";
import Typography from "@material-ui/core/Typography";
import SimpleTable from "../../components/tables/SimpleTable";
import axios from "axios";
import PropTypes from "prop-types";
import SimpleLineChart from "../../components/charts/SimpleLineChart";

const ENDPOINT_BASE = process.env.REACT_APP_API_ENDPOINT_BASE;

const columnNames = [
  'name', 'topic', 'purpose', 'member_count', 'message_count'
];

export default class ChannelShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: [],
      groupdate: {},
      channel_id: props.match.params.id
    };
    this.getData()
  }

  getData() {
    axios
      .get(ENDPOINT_BASE + `/channels/${this.state.channel_id}.json`)
      .then(results => {
        const data = results.data;
        this.setState({
          channel: data
        });
      });

    axios
      .get(ENDPOINT_BASE + `/channels/${this.state.channel_id}/message_groupdate`)
      .then(results => {
        const data = results.data;
        this.setState({
          groupdate: data
        });
      });
  }

  render() {
    const {classes, match} = this.props;
    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          特定のチャンネル channel_id:{match.params.id}
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable data={this.state.channel} columnNames={columnNames}/>
        </div>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart
            data={this.state.groupdate.data}
            labels={this.state.groupdate.labels}/>
        </Typography>

      </main>
    );
  }
}

ChannelShow.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
