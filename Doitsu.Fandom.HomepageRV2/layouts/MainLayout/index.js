import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// layout component
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";

const styles = theme => ({
  layout: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0)
  },
  mainContent: {
    marginTop: theme.spacing(13)
  }
});

class MainLayout extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md" className={classes.layout}>
          <Header id="layout-header" className={classes.layoutHeader} />
           ̰{" "}
          <main id="main-content" className={classes.mainContent}>
            <Breadcrumbs />
            {children}
          </main>
          {/* Footer */}
          <Footer />
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
