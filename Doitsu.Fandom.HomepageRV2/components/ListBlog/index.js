import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// External Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import Link from "../Link";
import Icon from "@material-ui/core/Icon";
import Utils from "../../utils";

const styles = theme => ({
  root: {
    width: "100%"
  },
  listItemButton: {
    backgroundColor: theme.palette.primary.main,
    minHeight: 100
  },
  flexRight: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

/**
 * This component to render list blog to index page
 * like list notice or list news
 */
class ListBlog extends React.Component {

  render() {
    const {
      classes,
      type,
      items,
      isShortContent,
      limitShortContent,
      isShow
    } = this.props;
    return (
      <List component="nav" className={classes.root}>
        {items && items.length > 0
          ? items.map((e, i) => {
              const draftTimeNormalize = new Date(
                e.draftTime
              ).toLocaleDateString();
              return (
                <Link
                  key={i}
                  as={`/${type}/${e.slug}`}
                  href={`/${type}-detail?slug=${e.slug}`}
                >
                  <Grow in={isShow} timeout={isShow ? (400 * i) : 0} unmountOnExit>
                    <ListItem
                      button
                      classes={{
                        button: classes.listItemButton
                      }}
                      divider={true}
                    >
                      <ListItemIcon>
                        <Icon>
                          {type === "notice"
                            ? i === 0
                              ? "notifications_active"
                              : "notifications"
                            : "star"}
                        </Icon>
                      </ListItemIcon>
                      <ListItemText
                        primary={e.title}
                        primaryTypographyProps={{
                          variant: "body2",
                          align: "justify"
                        }}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textSecondary"
                            >
                              {isShortContent || false
                                ? `- ${Utils.buildShortContent(
                                    e.content,
                                    limitShortContent || 20
                                  )}`
                                : ``}
                            </Typography>
                            <Typography
                              component="span"
                              className={classes.flexRight}
                              color="textPrimary"
                              align="right"
                            >
                              {`${draftTimeNormalize}`}
                            </Typography>
                          </React.Fragment>
                        }
                        secondaryTypographyProps={{
                          align: "justify"
                        }}
                      />
                    </ListItem>
                  </Grow>
                </Link>
              );
            })
          : ""}
      </List>
    );
  }
}

ListBlog.propTypes = {
  classes: PropTypes.object.isRequired,
  isShow: PropTypes.bool.isRequired
};

export default withStyles(styles)(ListBlog);
