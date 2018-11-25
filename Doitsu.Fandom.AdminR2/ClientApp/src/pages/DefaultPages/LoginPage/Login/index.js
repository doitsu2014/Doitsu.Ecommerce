import React from 'react'
import LoginForm from './LoginForm'
import './style.scss'

class Login extends React.Component {
  state = {}

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
    return (
      <div className="main-login main-login--fullscreen">
        <div className="main-login__header">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-login__header__logo">
                <a href="javascript: void(0);">
                  <img src="resources/images/logoygfl.png" alt="Clean UI Admin Template" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="main-login__block main-login__block--extended pb-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="main-login__block__promo text-black text-center">
                <h1 className="mb-3 text-black">
                  <strong>Xin chào bạn đến với YGFL Admin</strong>
                </h1>
              </div>
              <div className="main-login__block__inner">
                <div className="main-login__block__form">
                  <LoginForm email={this.state.restoredEmail} />
                </div>
                <div className="main-login__block__sidebar">
                  <h4 className="main-login__block__sidebar__title text-white">
                    <strong>Thông tin phiên bản trang quản trị</strong>
                    <br />
                    <span>Tháng 11, 2018</span>
                  </h4>
                  <div className="main-login__block__sidebar__item">
                    Phiên bản: 1.0
                  </div>
                  <div className="main-login__block__sidebar__place">
                    <i className="icmn-location mr-3" />
                      Việt Nam, Hồ Chí Minh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-login__footer text-center">
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">
              <a href="javascript: void(0);">Điều khoản</a>
            </li>
            <li className="list-inline-item">
              <a href="javascript: void(0);">Liên hệ</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Login
