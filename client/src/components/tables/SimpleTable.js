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

const default_data = {
  data:
    [{
      id: 'sample_data',
      sample_a: 'sample_data_a',
      sample_b: 'sample_data_b',
      sample_c: 'sample_data_c',
      sample_d: 'sample_data_d',
      sample_e: 'sample_data_e'
    }],
  columnNames:
    ['sample_a', 'sample_b', 'sample_c', 'sample_d', 'sample_e']
};

function SimpleTable(props) {
  const {
    classes,
    data = default_data.data,
    columnNames = default_data.columnNames,
  } = props;
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
  data: PropTypes.array,
  columnNames: PropTypes.array,
};

export default withStyles(styles)(SimpleTable);
