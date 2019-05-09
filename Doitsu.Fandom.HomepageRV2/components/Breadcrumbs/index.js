import React, { Component } from "react";
import { withRouter } from "next/router";

import { makeStyles } from "@material-ui/styles";
import MUIBreadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Link from "../Link";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0),
    display: "flex",
    justifyContent: "left",
    alignItems: "flex-end"
  },
  bcIcon: {
  },
  link: {
    cursor: "pointer"
  }
}));

function Breadcrumbs({ router }) {
  const classes = useStyles();
  const data = [...new Set(router.asPath.split("/"))].map(sub => ({
    face: (sub || "Home").toUpperCase(),
    origin: sub
  }));

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Typography>
          <Icon className={classes.bcIcon}>play_arrow</Icon>
        </Typography>
        <MUIBreadcrumbs aria-label="Breadcrumb">
          {data.map((e, i) => {
            if (i !== data.length - 1) {
              let originHref = "";
              data.slice(0, i + 1).forEach(val => {
                originHref += `${val.origin}/`;
              });
              return (
                <Link
                  key={i}
                  color="inherit"
                  href={originHref}
                  className={classes.link}
                >
                  {e.face}
                </Link>
              );
            } else {
              return (
                <Typography key={i} color="textPrimary" variant="h6">
                  {e.face}
                </Typography>
              );
            }
          })}
        </MUIBreadcrumbs>
      </div>
    </React.Fragment>
  );
}

export default withRouter(Breadcrumbs);
