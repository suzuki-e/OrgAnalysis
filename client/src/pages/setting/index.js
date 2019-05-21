import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import SimpleTable from "../../components/SimpleTable";

export default class SettingTop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <main>
        <Typography variant="h4" gutterBottom component="h2">
          設定
        </Typography>
        <div className={classes.tableContainer}>
          <SimpleTable/>
        </div>
      </main>
    );
  }
}

SettingTop.propTypes = {
  classes: PropTypes.object.isRequired,
};
