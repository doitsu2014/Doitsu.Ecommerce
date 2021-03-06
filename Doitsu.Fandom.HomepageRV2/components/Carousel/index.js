import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Link from "../Link";
import SwipeableViews from "react-swipeable-views";
import Fade from "@material-ui/core/Fade";

import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  carouselItemWrapper: {
    position: "relative"
  },
  imgWrapper: {},
  img: {
    height: "auto",
    width: "100%",
    display: "block",
    overflow: "hidden"
  },
  mobileStepper: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.contrastText
  }
});

class Carousel extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme, steps } = this.props;
    const { activeStep } = this.state;
    const maxSteps = steps.length;
    return (
      <Fade in={true} timeout={1000}>
        <div className={classes.root}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={this.handleStepChange}
            enableMouseEvents
          >
            {steps.map((step, index) => (
              <div key={index} className={classes.carouselItemWrapper}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Link href={step.href} className={classes.imgWrapper}>
                    <img
                      className={classes.img}
                      src={`${step.imgPath}?width=1024&height=576`}
                      alt={step.label}
                    />
                  </Link>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.mobileStepper}
            nextButton={
              <Button
                color="secondary"
                size="small"
                onClick={this.handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                color="secondary"
                onClick={this.handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </div>
      </Fade>
    );
  }
}

Carousel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(Carousel);
