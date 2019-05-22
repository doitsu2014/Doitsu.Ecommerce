import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Link from "../components/Link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import ListBlog from "../components/ListBlog";

import BlogService from "../services/BlogService";

import Utils from "../utils";

const styles = theme => ({
  root: {
    padding: theme.spacing(0, 2)
  },
  navButtons: {},
  navButtonsEnd: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2)
  },
  navButtonsStart: {
    display: "flex",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 2)
  },
  navInnerButton: {
    margin: theme.spacing(0, 1),
    textDecoration: "none",
  }
});

class Notice extends Component {
  state = {
    isShow: true
  }

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

  componentWillReceiveProps() {
    this.setState({isShow: true})
  }

  changePage = () => {
    this.setState({isShow: false})
  }

  render() {
    const {
      notices,
      classes,
      currentPage,
      isEndPage,
      isBeginPage
    } = this.props;

    const { isShow } = this.state;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <ListBlog
              items={notices}
              type="notice"
              isShow={isShow}
            />
          </Grid>
          <Grid item xs={6} className={classes.navButtonsEnd}>
            <Button
              color="secondary"
              disabled={isBeginPage}
              variant="contained"
              size="large"
              onClick={this.changePage}
            >
              <Link
                href={`/notice?page=${currentPage - 1}`}
                underline="none"
                className={classes.navInnerButton}
              >
                <Box display="flex" color={isBeginPage ? "text.disabled" : "primary.main"}>
                  <Icon>arrow_back_ios</Icon>Previous
                </Box>
              </Link>
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.navButtonsStart}>
            <Button
              color="secondary"
              disabled={isEndPage}
              variant="contained"
              size="large"
              onClick={this.changePage}
            >
              <Link
                href={`/notice?page=${Number.parseInt(currentPage) + 1}`}
                underline="none"
                className={classes.navInnerButton}
              >
                <Box display="flex" color={isEndPage ? "text.disabled" : "primary.main"}>
                  Next<Icon>arrow_forward_ios</Icon>
                </Box>
              </Link>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Notice);
