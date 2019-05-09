import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// External Components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "../Link";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    width: "100%"
  },
  listItemButton: {
    backgroundColor: theme.palette.primary.main,
    minHeight: 100
  }
});

/**
 * This component to render list blog to index page
 * like list notice or list news
 */
class ListBlog extends React.Component {
  render() {
    const { classes, type, items } = this.props;
    return (
      <List component="nav" className={classes.root}>
        {items && items.length > 0
          ? items.map((e, i) => {
              const draftTimeNormalize = (new Date(e.draftTime)).toLocaleDateString();
              return (
                <Link key={i} 
                  as={`/${type}/${e.slug}`}
                  href={`/${type}-detail?slug=${e.slug}`}>
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
                      inset
                      primary={e.title}
                      primaryTypographyProps={{
                        align: "justify"
                      }}
                      secondary={draftTimeNormalize}
                      secondaryTypographyProps={{
                        align: "right"
                      }}
                    />
                  </ListItem>
                </Link>
              );
            })
          : ""}
      </List>
    );
  }
}

ListBlog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListBlog);
