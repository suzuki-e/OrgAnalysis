import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import Paper from '@material-ui/core/Paper/index';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

const default_data = [
  {
    id: 'sample_data',
    sample_a: 'sample_data_a',
    sample_b: 'sample_data_b',
    sample_c: 'sample_data_c',
    sample_d: 'sample_data_d',
    sample_e: 'sample_data_e'
  }
];

function SimpleTable(props) {
  let {classes, data, columnNames} = props;
  if (columnNames === undefined) {
    columnNames = ['sample_a', 'sample_b', 'sample_c', 'sample_d', 'sample_e']
  }
  if (data === undefined || !data.length) {
    data = default_data
  }
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columnNames.map(columnName => (
              <TableCell>{columnName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => (
            <TableRow key={n.id}>
              {columnNames.map(columnName => (
                <TableCell component="th" scope="row">
                  {n[columnName]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  columnNames: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
