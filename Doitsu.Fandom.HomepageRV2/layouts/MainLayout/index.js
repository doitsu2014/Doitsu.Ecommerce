import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// layout component
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "../../components/Header";

const styles = globalTheme => ({
  layout: {
    backgroundColor: globalTheme.palette.background.default,
    [globalTheme.breakpoints.up(1100 + globalTheme.spacing(6))]: {
    }
  },
  footer: {
    backgroundColor: globalTheme.palette.background.paper,
    marginTop: globalTheme.spacing(8),
    padding: `${globalTheme.spacing(6)}px 0`
  }
});

class MainLayout extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <React.Fragment>
        <CssBaseline/>
        <Container className={classes.layout}>
          <Header />
          <main id="main-content" className={classes.mainContent}>
            {children}
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              Something here to give the footer a purpose!
            </Typography>
          </footer>
          {/* End footer */}
        </Container>
      </React.Fragment>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default MainLayout;
export default withStyles(styles)(MainLayout);
