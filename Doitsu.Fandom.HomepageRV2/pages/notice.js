import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Link from "../components/Link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ListBlog from "../components/ListBlog";

import BlogService from "../services/BlogService";

import Utils from "../utils";

const styles = theme => ({
  root: {},
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

class Notice extends Component {
  static async getInitialProps(context) {
    const params = context.query;
    const currentPage = params.page || 1;
    const limitGetNotices = 10;
    const getNotices = await BlogService.get(
      Utils.BLOG_CATEGORY_CONSTS.NOTICE,
      limitGetNotices,
      currentPage
    );
    const totalPage = Math.ceil(getNotices.totalFullData / limitGetNotices);

    return {
      notices: getNotices.data,
      currentPage,
      isEndPage: currentPage == totalPage,
      isBeginPage: currentPage == 1
    };
  }

  render() {
    const {
      notices,
      classes,
      currentPage,
      isEndPage,
      isBeginPage
    } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <ListBlog items={notices} type="notice" isShortContent={true} limitShortContent={200} />
          </Grid>
          <Grid item xs={6} className={classes.navButtonsEnd}>
            <Link
              href={`/notice?page=${currentPage - 1}`}
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
              href={`/notice?page=${Number.parseInt(currentPage) + 1}`}
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
      </div>
    );
  }
}

export default withStyles(styles)(Notice);
