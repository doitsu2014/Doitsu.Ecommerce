import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import BlogService from "../services/BlogService";
import TagService from "../services/TagService";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import CardBlogDetail from "../components/CardBlogDetail";
import TagBox from "../components/TagBox";
import ListBlogWithAvatar from "../components/ListBlogWithAvatar";

import Utils from "../utils";

const styles = theme => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
  },
  breadcrumbs: {
    padding: `${theme.spacing(2)}px 0`
  }
});

class NewsDetail extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const getBlogBySlug = await BlogService.getBySlug(slug);
    const getNewsBaseRes = await BlogService.get(Utils.BLOG_CATEGORY_CONSTS.NEWS,5);
    const getPopularTag = await TagService.getPopular();

    const tags = getPopularTag.data;
    const news = getBlogBySlug.data;
    const top5News = getNewsBaseRes.data;
    return { news, top5News, tags };
  }

  render() {
    const { news, classes, top5News, tags } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
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
            <Grid item sm={12} lg={4}>
              <ListBlogWithAvatar type="latest-news" blogs={top5News} />
              <TagBox tags={tags} />
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(NewsDetail);
