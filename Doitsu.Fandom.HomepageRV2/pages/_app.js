import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../src/theme";

import NProgress from "nprogress";
import Router from "next/router";

// layout component
import MainLayout from "../layouts/MainLayout";

function GetCustomNProgress() {
  NProgress.configure({
    parent: "#layout-header"
  });
  return NProgress;
}

Router.events.on("routeChangeStart", url => {
  GetCustomNProgress().start();
});
Router.events.on("routeChangeComplete", () => GetCustomNProgress().done());
Router.events.on("routeChangeError", () => GetCustomNProgress().done());

class FandomApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>YG Family</title>
        </Head>
        <ThemeProvider theme={theme}>

          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </Container>
    );
  }
}

export default FandomApp;
