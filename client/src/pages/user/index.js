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

export default class UserTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}]
    };
    this.getData();
  }

  getData() {
    axios
      .get(ENDPOINT_BASE + '/users.json')
      .then(results => {
        const data = results.data;
        this.setState({
          data: data
        });
      });
  }

  j

  render() {
    const {classes} = this.props;
    const data = this.state.data;
    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          ユーザー一覧
        </Typography>
        <div className={classes.tableContainer}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>画像</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">RealName</TableCell>
                  <TableCell align="right">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(d => (
                  <TableRow key={d.id}>
                    <TableCell align="right">
                      <img src={d.profile_image} alt="" width="" height="" border=""/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {d.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {d.real_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {d.email}
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

UserTop.propTypes = {
  classes: PropTypes.object.isRequired,
};
