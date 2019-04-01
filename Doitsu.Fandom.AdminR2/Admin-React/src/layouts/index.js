import React, { Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import Loader from 'components/LayoutComponents/Loader'
import PublicLayout from './Public'
import LoginLayout from './Login'
import MainLayout from './Main'

// this is enumeration of Layout
// key is name of layout
// value is a Layout Instance
const Layouts = {
  public: PublicLayout,
  login: LoginLayout,
  main: MainLayout,
}

@withRouter
@connect(({ user }) => ({ user }))
class IndexLayout extends React.PureComponent {
  previousPath = ''

  componentDidUpdate(prevProps) {
    const { location } = this.props
    const { prevLocation } = prevProps
    if (location !== prevLocation) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const {
      children,
      location: { pathname, search },
      user,
    } = this.props

    // NProgress Management
    const currentPath = pathname + search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    setTimeout(() => {
      NProgress.done()
      this.previousPath = currentPath
    }, 300)

    // Layout Rendering
    // this function to get name of layout
    // reference: Layout variable
    const getLayout = () => {
      if (pathname === '/') {
        return 'public'
      }
      if (/^\/user(?=\/|$)/i.test(pathname)) {
        return 'login'
      }
      return 'main'
    }

    // Container to render
    const Container = Layouts[getLayout()]

    // Tracking variable to know user go the fail url
    const isUserAuthorized = user.authorized
    const isUserLoading = user.loading
    const isLoginLayout = getLayout() === 'login'

    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isLoginLayout) {
        return <Loader />
      }
      // redirect to login page if current is not login page and user not authorized
      if (!isLoginLayout && !isUserAuthorized) {
        return <Redirect to="/user/login" />
      }
      // redirect to main dashboard when user on login page and authorized
      if (isLoginLayout && isUserAuthorized) {
        return <Redirect to="/artists" />
      }
      // in other case render previously set layout
      return <Container>{children}</Container>
    }

    return (
      <Fragment>
        <Helmet titleTemplate="YG FAMILY | %s" title="YGFL ADMIN" />
        {BootstrappedLayout()}
      </Fragment>
    )
  }
}

export default IndexLayout
