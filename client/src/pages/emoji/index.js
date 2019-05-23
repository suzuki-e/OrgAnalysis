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

const ENDPOINT_BASE = process.env.REACT_APP_API_ENDPOINT_BASE;

export default class EmojiTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}]
    };
    this.getData();
  }

  getData() {
    axios
      .get(ENDPOINT_BASE + '/emojis.json')
      .then(results => {
        const data = results.data;
        this.setState({
          data: data
        });
      });
  }

  render() {
    const {classes} = this.props;
    const data = this.state.data;
    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          絵文字一覧
        </Typography>
        <div className={classes.tableContainer}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>画像</TableCell>
                  <TableCell align="right">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(e => (
                  <TableRow key={e.id}>
                    <TableCell align="right">
                      <img src={e.url} alt="" width="" height="" border=""/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {e.slack_name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </main>
    );
  }
}

EmojiTop.propTypes = {
  classes: PropTypes.object.isRequired,
};

