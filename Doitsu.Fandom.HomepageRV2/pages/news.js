import { Component } from "react";
import BlogService from "../services/BlogService";
import Utils from "../utils";

import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import CardBlog from "../components/CardBlogOverview";

export default class News extends Component {
  static async getInitialProps() {
    const baseData = await BlogService.get(Utils.BLOG_CATEGORY_CONSTS.NEWS);
    return {
      blogs: baseData.data
    };
  }

  render() {
    const { blogs } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={4}>
          {/** show news blogs */}
          <Grid item lg={8} sm={12}>
            <Grid container spacing={2}>
              {(blogs || []).map((e, i) => {
                e.draftTime = (new Date((e.draftTime || new Date()))).toLocaleDateString()
                return (<Grid key={i} item lg={6} sm={12}>
                  <CardBlog blog={e} isShort={true} originRedirectLink={`/news-detail?slug=${e.slug}`} fakeRedirectLink={`news/${e.slug}`}/>
                </Grid>);
              })}
            </Grid>
          </Grid>
          {/* show trend and popular tags */}
          <Grid item lg={2} sm={12} />
        </Grid>
      </React.Fragment>
    );
  }
}
