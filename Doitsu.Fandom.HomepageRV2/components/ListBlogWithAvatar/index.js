import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";

import Link from "../Link";
import Utils from "../../utils";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.default
  },
  inline: {
    display: "inline"
  },
  section1: {
    margin: theme.spacing(1, 1)
  },
  listItemAvatar: {
    maxWidth: 160,
    minWidth: 160,
    marginRight: theme.spacing(1)
  },
  imagePreview: {
    minWidth: "100%",
    height: "96px"
  }
}));

const TYPE_CONST = {
  news: {
    title: "News",
    originPrefix: "/news-detail",
    fakePrefix: "/news",
  },
  "latest-news": {
    title: "Latest News",
    originPrefix: "/news-detail",
    fakePrefix: "/news",
  }
};

function ListBlogWithAvatar({ blogs, type }) {
  const classes = useStyles();
  const currentType =(TYPE_CONST[type] || TYPE_CONST["news"]);
  return (
    <div>
      <div className={classes.section1}>
        <Typography variant="h6" align="center">
          {currentType.title}
        </Typography>
      </div>
      <Divider variant="middle" />
      <List className={classes.root}>
        {(blogs || []).map(blog => {
          return (
            <Link key={blog.id} href={`${currentType.originPrefix}?slug=${blog.slug}`} as={`${currentType.fakePrefix}/${blog.slug}`}>
              <ListItem alignItems="flex-start" button>
                <ListItemAvatar className={classes.listItemAvatar}>
                  <div
                    className={classes.imagePreview}
                    style={{
                      backgroundImage: `url('${blog.thumbnailURL}?width=256&height=144')`,
                      backgroundSize: "cover",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={Utils.buildShortContent(blog.title, 23)}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        YGFL
                      </Typography>
                      {`- ${Utils.buildShortContent(blog.content, 30)}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Link>
          );
        })}
      </List>
    </div>
  );
}

export default ListBlogWithAvatar;
