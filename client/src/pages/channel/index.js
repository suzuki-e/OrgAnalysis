import React from "react";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import PropTypes from "prop-types";
import SimpleLinkedTable from "../../components/SimpleLinkedTable";

const ENDPOINT_BASE = process.env.REACT_APP_API_ENDPOINT_BASE;

const columnNames = [
  'name', 'topic', 'purpose', 'users_count', 'messages_count'
];

export default class ChannelTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: {},
      link_paths: {}
    };
    this.getData();
    this.handleClick = this.handleClick.bind(this)
  }

  getData() {
    axios
      .get(ENDPOINT_BASE + '/channels.json')
      .then(results => {
        const data = results.data;
        const link_paths = data.map(c => `/channels/${c.id}`);
        this.setState({
          channels: data,
          link_paths: link_paths,
        });
      });
  }

  handleClick(path) {
    this.props.history.push(path);
  }

  render() {
    const {classes} = this.props;
    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          チャンネル一覧
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleLinkedTable
            data={this.state.channels}
            columnNames={columnNames}
            link_paths={this.state.link_paths}
            handleClick={this.handleClick}
          />
        </div>
      </main>
    );
  }
}

ChannelTop.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
