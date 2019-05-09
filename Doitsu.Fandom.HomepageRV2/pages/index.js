/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import BlogService from "../services/BlogService";
import Settings from "../services/SettingsService";
import Utils from "../utils";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Carousel from "../components/Carousel";
import ListBlog from "../components/ListBlog";
import SettingsService from "../services/SettingsService";

const styles = theme => ({
  root: {
    flexGrow: 1
  },

  mainSlider: {},

  mainBoard: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },

  mainBoardColumn: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },

  mainBoardTitleContainer: {
    width: "100%",
    display: "inline-block"
  },

  mainBoardTitle: {
    fontWeight: "bold",
    float: "left"
  },

  mainBoardTitleSecondary: {
    float: "right"
  },

  mainFeaturedPost: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4)
  },

  mainFeaturedPostContent: {
    padding: `4px`,
    [theme.breakpoints.up("md")]: {
      paddingRight: 0
    }
  },

  card: {
    display: "flex",
    margin: theme.spacing(2)

  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  }
});

class Index extends React.Component {
  static async getInitialProps() {
    const getNoticeBaseRes = await BlogService.get(Utils.BLOG_CATEGORY_CONSTS.NOTICE, 5);
    const getNewsBaseRes = await BlogService.get(Utils.BLOG_CATEGORY_CONSTS.NEWS, 5);
    const getSliderSettings = await SettingsService.get();
    
    const noticeItems = (getNoticeBaseRes.data || [])
    const newsItems =  (getNewsBaseRes.data || [])
    const sliderSettings = (getSliderSettings.data || []).slice(0,5).map(e => ({
      imgPath: e.thumbnailURL,
      label: e.title,
      type: e.type,
      category: e.blogCategoryId
    }));
    return {
      noticeItems,
      newsItems,
      steps: sliderSettings,
      featuredPosts: [
        {
          title: "Advertiser 01",
          date: "01/01/2019",
          description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
          thumbUrl:
            "https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/16/2017/10/03170150/master-facebook-left-image-966-x-1250-791x1024.png"
        },
        {
          title: "Advertiser 02",
          date: "02/02/2019",
          description:
            "This is a wider card with supporting text below as a natural lead-in to additional content.",
          thumbUrl:
            "https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2016/11/08113103/Screen-Shot-2016-11-08-at-11.29.49-AM.png"
        }
      ]
    };
  }

  render() {
    const {
      classes,
      noticeItems,
      newsItems,
      featuredPosts,
      steps
    } = this.props;
    return (
      <div>
        {/* Main featured post */}
        <Carousel steps={steps} className={classes.mainSlider} />
        <Grid container className={classes.mainBoard}>
          <Grid item lg={6} xs={12} className={classes.mainBoardColumn}>
            <div className={classes.mainBoardTitleContainer}>
              <Typography
                align="left"
                variant="h5"
                className={classes.mainBoardTitle}
              >
                Notice
              </Typography>
              <Typography
                align="right"
                href="/notice"
                component={props => {
                  const { children, href } = props;
                  return (
                    <Link href={href}>
                      <Button {...props}>{children}</Button>
                    </Link>
                  );
                }}
                className={classes.mainBoardTitleSecondary}
              >
                more...
              </Typography>
            </div>
            <ListBlog items={noticeItems} type="notice" />
          </Grid>
          <Grid item lg={6} xs={12} className={classes.mainBoardColumn}>
            <div className={classes.mainBoardTitleContainer}>
              <Typography
                align="left"
                variant="h5"
                className={classes.mainBoardTitle}
              >
                News
              </Typography>
              <Typography
                align="right"
                href="/news"
                component={props => {
                  const { children, href } = props;
                  return (
                    <Link href={href}>
                      <Button {...props}>{children}</Button>
                    </Link>
                  );
                }}
                className={classes.mainBoardTitleSecondary}
              >
                more...
              </Typography>
            </div>
            <ListBlog items={newsItems} type="news" />
          </Grid>
        </Grid>
        <Grid container className={classes.cardGrid}>
          {featuredPosts.map(post => (
            <Grid item key={post.title} xs={12} md={6}>
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {post.date}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {post.description}
                    </Typography>
                  </CardContent>
                </div>
                <Hidden xsDown>
                  <CardMedia
                    className={classes.cardMedia}
                    image={post.thumbUrl}
                    title="Image title"
                  />
                </Hidden>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
