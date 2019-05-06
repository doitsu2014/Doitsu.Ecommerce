import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Link from "../Link";

// Components
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import SearchIcon from "@material-ui/icons/Search";

import NavTabs from "../NavTabs"

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main
  },
  toolbarMain: {},
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  },
});
class Header extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbarMain}>
            <IconButton href="https://www.facebook.com/ygfl.vn/">
              <SvgIcon>
                <path
                  fill="#000000"
                  d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z"
                />
              </SvgIcon>
            </IconButton>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              <img style={({
                width: "216px",
                height: "auto"
              })} src="/static/logo.png" />
            </Typography>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Toolbar>
          <NavTabs />
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
