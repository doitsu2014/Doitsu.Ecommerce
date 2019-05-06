import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import BlogService from "../services/BlogService";

import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardBlogDetail from "../components/CardBlogDetail";
import Link from "../components/Link";

const styles = theme => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap"
  },
  breadcrumbs: {
    padding: `${theme.spacing(2)}px 0`
  }
});

class NewsDetail extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const baseRes = await BlogService.getBySlug(slug);
    const news = baseRes.data;
    return { news };
  }

  render() {
    const { news, classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
            <Link href="/">
              {/* <Typography variant="h6">Home</Typography> */}
              Home
            </Link>
            <Link href="/news">
              <Typography variant="h6">News</Typography>
            </Link>
            <Typography variant="h6" color="textPrimary">
              {news.slug}
            </Typography>
          </Breadcrumbs>

          <Grid container spacing={2}>
            <Grid item sm={12} lg={8}>
              {news ? (
                <CardBlogDetail blog={news} />
              ) : (
                <Paper>
                  <Typography variant="h5" component="h3">
                    404 Not Found
                  </Typography>
                </Paper>
              )}
            </Grid>
            <Grid item sm={12} lg={4} />
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(NewsDetail);
