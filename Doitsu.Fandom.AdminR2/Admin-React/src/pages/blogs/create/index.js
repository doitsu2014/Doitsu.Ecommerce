import React from 'react'
import { Helmet } from 'react-helmet'
import BlogEditor from 'pages/blogs/editor'

export default class CreateBlogPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Create blog page" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Create blog page</strong>
            </div>
          </div>
          <div className="card-body">
            <BlogEditor />
          </div>
        </div>
      </div>
    )
  }
}
