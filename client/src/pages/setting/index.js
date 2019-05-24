import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

export default class SettingTop extends React.Component {
  render() {
    const {classes} = this.props;

    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          設定
        </Typography>
        <div className={classes.tableContainer}>
          <p>No data yet.</p>
        </div>
      </main>
    );
  }
}

SettingTop.propTypes = {
  classes: PropTypes.object.isRequired,
};
