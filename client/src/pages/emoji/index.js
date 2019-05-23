import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import Paper from '@material-ui/core/Paper/index';
import axios from "axios";
import EmojiPaginationTable from "./components/tables/EmojiPaginationTable";

export default class EmojiTop extends React.Component {
  constructor(props) {
    super(props);
  }

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

