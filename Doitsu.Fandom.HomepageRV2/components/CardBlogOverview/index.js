import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Icon from "@material-ui/core/Icon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CircularProgress from "@material-ui/core/CircularProgress";

import Link from "../Link";
import Utils from "../../utils";
import { relative } from "path";

const useStyles = makeStyles(theme => ({
  card: {
    background: theme.palette.primary.main
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  seeDetail: {
    marginLeft: "auto",
    position: "relative"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: theme.palette.secondary.dark
  },
  fabProgress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1
  }
}));

function CardBlog(props) {
  const { blog, fakeRedirectLink, originRedirectLink, isShort } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            YG
          </Avatar>
        }
        title={isShort ? Utils.buildShortContent(blog.title, 35) : blog.title}
        subheader={blog.draftTime}
      />
      <CardMedia
        className={classes.media}
        image={`${blog.thumbnailURL}?width=512&height=288`}
        title={blog.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {isShort ? Utils.buildShortContent(blog.content, 60) : blog.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <div className={classes.seeDetail}>
          <Link
            as={fakeRedirectLink}
            href={originRedirectLink}
            onClick={() => {
              setLoading(!loading);
            }}
          >
            <IconButton arial-label="See">
              <Icon>send</Icon>
            </IconButton>
            {loading && (
              <CircularProgress size={48} className={classes.fabProgress} />
            )}
          </Link>
        </div>
      </CardActions>
    </Card>
  );
}

export default CardBlog;
