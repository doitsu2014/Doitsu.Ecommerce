import React from 'react'
import { Helmet } from 'react-helmet'
import BlogEditor from 'pages/blogs/editor'
import { connect } from 'react-redux'

@connect(({ blogState }) => ({ blogState }))
export default class UpdateBlogPage extends React.Component {
  render() {
    const { blogState } = this.props
    return (
      <div>
        <Helmet title="Update blog page" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Update blog page</strong>
            </div>
          </div>
          <div className="card-body">
            <BlogEditor defaultTrackingId={blogState.trackingId} />
          </div>
        </div>
      </div>
    )
  }
}
