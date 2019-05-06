import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// layout component
import Typography from "@material-ui/core/Typography";
import Header from "../../components/Header";

const styles = globalTheme => ({
  layout: {
    width: "auto",
    marginLeft: globalTheme.spacing(3),
    marginRight: globalTheme.spacing(3),
    backgroundColor: globalTheme.palette.background.default,
    [globalTheme.breakpoints.up(1100 + globalTheme.spacing(6))]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
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
        <div className={classes.layout}>
          <Header />
          <main id="main-content">
            {children}
            
          </main>
        </div>
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
      </React.Fragment>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
}

// export default MainLayout;
export default withStyles(styles)(MainLayout);
