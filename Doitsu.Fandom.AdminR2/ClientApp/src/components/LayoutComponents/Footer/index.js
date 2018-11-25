import React from 'react'
import { Button } from 'antd'
import './style.scss'

class AppFooter extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__top">
          <div className="row">
            <div className="col-lg-6">
              <p>
                <strong>Cá nhân thiết kế: Trần Hữu Đức</strong>
              </p>
            </div>
            <div className="col-sm-6">
              <div className="footer__copyright">
                <img
                  src="resources/images/doitsu_tech_logo.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  alt="DOITSU Tech"
                />
                <span>
                  © 2018{' '}
                  <a href="http://mediatec.org/" target="_blank" rel="noopener noreferrer">
                    DOITSU Tech
                  </a>
                  <br />
                  All rights reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppFooter
