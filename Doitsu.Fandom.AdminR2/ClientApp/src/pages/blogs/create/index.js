import React from 'react'
import { Helmet } from 'react-helmet'
import BlogEditor from 'pages/blogs/editor'
import { connect } from 'react-redux'

@connect(({ blogState }) => ({ blogState }))
export default class CreateBlogPage extends React.Component {
  render() {
    const defaultTrackingId = -1
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
            <BlogEditor defaultTrackingId={defaultTrackingId} />
          </div>
        </div>
      </div>
    )
  }
}
