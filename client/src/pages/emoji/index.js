import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import EmojiPaginationTable from "./components/tables/EmojiPaginationTable";

export default class EmojiTop extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          絵文字一覧
        </Typography>
        <div className={classes.tableContainer}>
          <EmojiPaginationTable/>
        </div>
      </main>
    );
  }
}

EmojiTop.propTypes = {
  classes: PropTypes.object.isRequired,
};

