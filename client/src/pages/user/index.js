import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import UserPaginationTable from "./components/tables/UserPaginationTable";

export default class UserTop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          ユーザー一覧
        </Typography>
        <div className={classes.tableContainer}>
          <UserPaginationTable/>
        </div>
      </main>
    );
  }
}

UserTop.propTypes = {
  classes: PropTypes.object.isRequired,
};
