import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import MessagePaginationTable from "./components/tables/MessagePaginationTable";

export default class MessageTop extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          メッセージ一覧
        </Typography>
        <div className={classes.tableContainer}>
          <MessagePaginationTable/>
        </div>
      </main>
    );
  }
}

MessageTop.propTypes = {
  classes: PropTypes.object.isRequired,
};
