import React from "react";
import Typography from "@material-ui/core/Typography";
import SimpleTable from "../../components/SimpleTable";
import PropTypes from "prop-types";

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
          <SimpleTable/>
        </div>
      </main>
    );
  }
}

UserTop.propTypes = {
  classes: PropTypes.object.isRequired,
};
