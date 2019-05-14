import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Link from "../Link";

const styles = theme => ({
  root: {
    width: "100%"
  },
  chip: {
    margin: theme.spacing(1),
    display: "inline-flex"
  },
  section1: {
    margin: theme.spacing(1, 1)
  },
  section2: {
    margin: theme.spacing(1),
    textAlign: "center"
  }
});

function TagBox(props) {
  const { classes, tags } = props;
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Tags
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <div>
          {(tags || []).map(val => {
            return (
              <Link key={val.id} href="#" className={classes.chip}>
                <Chip label={val.title} clickable />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

TagBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TagBox);
