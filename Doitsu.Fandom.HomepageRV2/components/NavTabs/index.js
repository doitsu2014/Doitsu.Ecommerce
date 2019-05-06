import React from "react";
import { withRouter } from "next/router";

// External Components
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const tabsData = [
  { label: "Home", path: "/" },
  { label: "Notice", path: "/notice" },
  { label: "News", path: "/news" }
];

class Header extends React.Component {
  handleChange = (event, value) => {
    event.preventDefault();
    const { router } = this.props;
    router.push(value);
  };

  render() {
    const { router } = this.props;
    let routeValue = router.route;
    if(routeValue.indexOf("-") > 0) {
      routeValue = routeValue.split("-")[0]
    }
    return (
      <Tabs
        color="paper"
        variant="fullWidth"
        value={routeValue || "/"}
        onChange={this.handleChange}
      >
        {tabsData.map((ele, index) => {
          return <Tab key={index} value={ele.path} href={ele.path} label={ele.label} />;
        })}
      </Tabs>
    );
  }
}

export default withRouter(Header);
