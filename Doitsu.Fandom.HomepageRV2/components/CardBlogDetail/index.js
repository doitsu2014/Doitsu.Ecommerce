import React from "react";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";

import HTMLRParser from "html-react-parser";

const useStyles = makeStyles(theme => ({
  card: {
    background: theme.palette.primary.main
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  seeDetail: {
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: theme.palette.secondary.dark
  }
}));

function CardBlogDetail(props) {
  const { blog } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            YG
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={blog.title}
        subheader={blog.draftTime}
      />
      <CardMedia
        className={classes.media}
        image={blog.thumbnailURL}
        title={blog.title}
      />
      <CardContent>
        {HTMLRParser(`<div>${blog.content}</div>`, {
          replace: function(domNode) {
            if (domNode.name && domNode.name === "oembed") {
              return React.createElement(
                "iframe",
                {
                  style: {
                    width: "100%",height: "600px"
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
        {/* {blog.content} */}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default CardBlogDetail;
