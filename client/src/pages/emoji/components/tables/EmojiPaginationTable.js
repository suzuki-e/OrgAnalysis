import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
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

class EmojiPaginationTable extends React.Component {
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
      .get('/emojis.json')
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
    const sliceStart = page * rowsPerPage;
    const sliceEnd = (page + 1) * rowsPerPage;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - sliceStart);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>画像</TableCell>
                <TableCell>id</TableCell>
                <TableCell>使用回数</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(sliceStart, sliceEnd).map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="right">
                    {row.url.startsWith('https') ?
                      <img src={row.url} alt="" width="32" height="32" border=""/> : 'alias/no-data'
                    }
                  </TableCell>
                  <TableCell component="th" scope="row">{row.slack_name}</TableCell>
                  <TableCell component="th" scope="row">{row.used_count}</TableCell>
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

EmojiPaginationTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmojiPaginationTable);
