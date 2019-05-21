import React from "react";
import Typography from "@material-ui/core/Typography";
import SimpleTable from "../../components/SimpleTable";
import axios from "axios";
import PropTypes from "prop-types";

const ENDPOINT_BASE = process.env.REACT_APP_API_ENDPOINT_BASE;

export default class ChannelTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: {}
    };
    this.getData()
  }

  getData() {
    axios
      .get(ENDPOINT_BASE + '/channels')
      .then(results => {
        const data = results.data;
        this.setState({
          channels: data
        });
      });
  }

  render() {
    const {classes} = this.props;
    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          チャンネル一覧
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable data={this.state.channels}/>
        </div>
      </main>
    );
  }
}

ChannelTop.propTypes = {
  classes: PropTypes.object.isRequired,
};
