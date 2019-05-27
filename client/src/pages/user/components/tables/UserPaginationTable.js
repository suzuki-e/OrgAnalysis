import React from "react";
import Paper from "@material-ui/core/Paper/index";
import Table from "@material-ui/core/Table/index";
import TableHead from "@material-ui/core/TableHead/index";
import TableRow from "@material-ui/core/TableRow/index";
import TableCell from "@material-ui/core/TableCell/index";
import TableBody from "@material-ui/core/TableBody/index";
import TableFooter from "@material-ui/core/TableFooter/index";
import TablePagination from "@material-ui/core/TablePagination/index";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {TablePaginationActionsWrapped} from "../../../../components/tables/CustomPaginationActionsTable"
import ApiClient from "../../../../utils/ApiClient";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class UserPaginationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      page: 0,
      rowsPerPage: 10,
    };
  };

  componentDidMount() {
    this.getData();
  };

  getData() {
    ApiClient
      .get('/users.json')
      .then(results => {
        const data = results.data;
        this.setState({
          rows: data,
        });
      })
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    const rowsPerPage = event.target.value === 'All' ? this.state.rows.length : parseInt(event.target.value);
    this.setState({page: 0, rowsPerPage: rowsPerPage});
  };

  render() {
    const {classes} = this.props;
    const {rows, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const slice_start = page * rowsPerPage;
    const slice_end = page * rowsPerPage + rowsPerPage;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>画像</TableCell>
                <TableCell>名前</TableCell>
                <TableCell>本名</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(slice_start, slice_end).map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right">
                    <img src={row.profile_image} alt="" width="" height="" border=""/>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.real_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{height: 48 * emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100, 'All']}
                  colSpan={0}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

UserPaginationTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPaginationTable);
