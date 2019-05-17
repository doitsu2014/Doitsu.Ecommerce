import { Component } from "react";
import BlogService from "../services/BlogService";
import TagService from "../services/TagService";
import Utils from "../utils";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CardBlog from "../components/CardBlogOverview";
import TagBox from "../components/TagBox";
import Link from "../components/Link";

const styles = theme => ({
  root: {
    padding: theme.spacing(2,1)
  },
  sideTitle: {},
  navButtons: {},
  navButtonsEnd: {
    display: "flex",
    justifyContent: "flex-end"
  },
  navButtonsStart: {
    display: "flex",
    justifyContent: "flex-start"
  },
  navInnerButton: {
    margin: theme.spacing(0, 1),
    textDecoration: "none"
  }
});

class News extends Component {
  static async getInitialProps(context) {
    const params = context.query;
    const currentPage = params.page || 1;
    const limitGetBlogByCategory = 10;
    const getBlogByCategory = await BlogService.get(
      Utils.BLOG_CATEGORY_CONSTS.NEWS,
      limitGetBlogByCategory,
      currentPage
    );
    const totalPage = Math.ceil(
      getBlogByCategory.totalFullData / limitGetBlogByCategory
    );

    const getPopularTag = await TagService.getPopular();
    const blogs = getBlogByCategory.data;
    const tags = getPopularTag.data;
    
    return {
      blogs,
      tags,
      currentPage,
      isEndPage: currentPage == totalPage,
      isBeginPage: currentPage == 1
    };
  }

  render() {
    const {
      blogs,
      tags,
      currentPage,
      isEndPage,
      isBeginPage,
      classes
    } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={4} className={classes.root}>
          {/** show news blogs */}
          <Grid item lg={8} sm={12}>
            <Grid container spacing={2}>
              {(blogs || []).map((e, i) => {
                e.draftTime = new Date(
                  e.draftTime || new Date()
                ).toLocaleDateString();
                return (
                  <Grid key={i} item lg={6} sm={12}>
                    <CardBlog
                      blog={e}
                      isShort={true}
                      originRedirectLink={`/news-detail?slug=${e.slug}`}
                      fakeRedirectLink={`/news/${e.slug}`}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12} />
              <Grid item xs={6} className={classes.navButtonsEnd}>
                <Link
                  href={`/news?page=${currentPage - 1}`}
                  underline="none"
                  className={classes.navInnerButton}
                >
                  <Button
                    color="secondary"
                    disabled={isBeginPage}
                    variant="contained"
                    size="large"
                  >
                    <Icon>arrow_back_ios</Icon>Previous
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6} className={classes.navButtonsStart}>
                <Link
                  href={`/news?page=${Number.parseInt(currentPage) + 1}`}
                  underline="none"
                  className={classes.navInnerButton}
                >
                  <Button
                    color="secondary"
                    disabled={isEndPage}
                    variant="contained"
                    size="large"
                  >
                    Next<Icon>arrow_forward_ios</Icon>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          {/* show trend and popular tags */}
          <Grid item lg={4} sm={12}>
            <TagBox tags={tags} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(News);
