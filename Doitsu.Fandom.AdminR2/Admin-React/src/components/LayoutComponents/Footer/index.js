import React from 'react'
import styles from './style.module.scss'

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.inner}>
      <div className="row">
        <div className="col-lg-9">
          <p>
            <strong>DOITSU TECH - CLEAN UI TEMPLATE</strong>
          </p>
          <p>DOITSU TECH - a organization implemented this admin page by CLEAN UI TEMPLATE</p>
          <p>Clean UI – a modern professional admin template, based on Bootstrap 4 framework.</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="row">
          <div className="col-sm-6">
            {/* <a
              href="https://themeforest.net/item/clean-ui-react-admin-template/21938700"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <Button type="danger">Buy Now 24$</Button>
            </a> */}
          </div>
          <div className="col-sm-6">
            <div className={styles.copyright}>
              <img
                src="resources/images/mediatec.png"
                rel="noopener noreferrer"
                alt="Mediatec Software"
              />
              <span>
                © 2018{' '}
                <a href="http://doitsu.tech/" target="_blank" rel="noopener noreferrer">
                  Doitsu Technology
                </a>
                <br />
                All rights reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Footer
