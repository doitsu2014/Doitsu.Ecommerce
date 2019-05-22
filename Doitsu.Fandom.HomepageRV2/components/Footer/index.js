import React from "react";
import { makeStyles } from "@material-ui/styles";
import Link from "../Link";

// Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    margin: theme.spacing(2,0,0,0)
  },
  panelHeader: {
    height: theme.spacing(6),
    fontWeight: "bold"
  },
  panel: {
    padding: theme.spacing(1),
    justifyContent: "center",
    textAlign: "justify"
  },
  leftInforImg: {
    display: "block",
    margin: "auto"
  },
  inforText: {
    overflow: "hidden",
    fontSize: "0.8rem",
    flexShrink: 0,
    margin: "auto",
    display: "inline-block"
  }
}));
function Footer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={8} className={classes.panel}>
          <Typography className={classes.panelHeader}>
            <img className={classes.leftInforImg} src={"/static/logo.png"} width="112" />
          </Typography>
          <Typography className={classes.inforText}>
            1st Vietnam fanpage of YG Family has YG Vietsub which is the most
            subscribed channel on Youtube of YG's Lovers in this country
          </Typography>
          <Typography component="p">
            <IconButton href="https://www.facebook.com/ygfl.vn/">
              <SvgIcon>
                <path
                  fill="#000000"
                  d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z"
                />
              </SvgIcon>
            </IconButton>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} className={classes.panel}>
          <Typography variant="h6" className={classes.panelHeader}>
            Our Information
          </Typography>
          <Typography>
            <Icon>contact_phone</Icon>{" "}
            <span className={classes.inforText}>034 229 3066</span>
          </Typography>
          <Typography>
            <Icon>contact_mail</Icon>{" "}
            <span className={classes.inforText}>ygflofficial@gmail.com</span>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Footer;
