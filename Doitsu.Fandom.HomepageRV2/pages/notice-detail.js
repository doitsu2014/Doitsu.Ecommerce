import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import HTMLRParser from "html-react-parser";
import BlogService from "../services/BlogService";

const styles = theme => ({
  root: {
    padding: theme.spacing(0,2)
  },
  noticeContent: {
    "& image": {
      maxWidth: "100%"
    }
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
    const { classes, news } = this.props;
    return (
      <React.Fragment>
        {news ? (
          <div className={classes.root}>
            <h2>{news.title}</h2>
            <img width="100%" src={`${news.thumbnailURL}?width=768&height=432`} />
            <div className={classes.noticeContent}>
              {HTMLRParser(`<div>${news.content}</div>`, {
                replace: function(domNode) {
                  if (domNode.name && domNode.name === "oembed") {
                    return React.createElement(
                      "iframe",
                      {
                        style: {
                          width: "100%",
                          height: "600px"
                        },
                        frameBorder: "0",
                        allow: "autoplay; encrypted-media",
                        allowFullScreen: true,
                        title: "video",
                        src: `${domNode.attribs && domNode.attribs.url}`
                      },
                      "replaced"
                    );
                  }
                }
              })}
            </div>
          </div>
        ) : (
          <div>404 not found</div>
        )}
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(NewsDetail);
