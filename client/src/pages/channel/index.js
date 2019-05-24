import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import ChannelPaginationTable from "./components/tables/ChannelPaginationTable";

export default class ChannelTop extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
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
          <ChannelPaginationTable
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
