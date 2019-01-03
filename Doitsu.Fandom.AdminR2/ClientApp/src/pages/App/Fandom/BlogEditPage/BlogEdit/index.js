import React from 'react'
import AddForm from './AddForm'
import './style.scss'

class BlogEditPost extends React.Component {
  render() {
    return (
      <section className="card">
        <div className="card-header mb-2">
          <div className="utils__title">
            <strong>Thêm bài viết</strong>
          </div>
        </div>
        <div className="card-body">
          <div className="add-post">
            <AddForm />
          </div>
        </div>
      </section>
    )
  }
}

export default BlogEditPost
