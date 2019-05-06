/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
});

class About extends React.Component {
  // Add some delay
  constructor(props) {
    super(props)

  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          about page
        </Typography>
        <Typography gutterBottom>
          <Link href="/">
            <a>Go to the main page</a>
          </Link>
        </Typography>
        <Button variant="contained" color="primary">
          Do nothing button
        </Button>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);