import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import htmlToReact from "html-to-react";
import BlogService from "../services/BlogService"



const htmlToReactParser = new htmlToReact.Parser();
const styles = (theme) => {

}

class NewsDetail extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const baseRes = await BlogService.getBySlug(slug);
    const news = baseRes.data;
    return { news };
  }

  render() {
    const { news } = this.props;
    return (
      <React.Fragment>
        {
          news ? (
            <div>
              <h1>{news.title}</h1>
              <img width="100%" src={news.thumbnailURL} />
              <div>{htmlToReactParser.parse(news.content)}</div>
            </div>
          ) : (
            <div>404 not found</div>
          )
        }
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(NewsDetail);