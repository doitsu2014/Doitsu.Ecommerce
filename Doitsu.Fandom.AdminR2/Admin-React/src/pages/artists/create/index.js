import React from 'react'
import { Helmet } from 'react-helmet'
import ArtistEditor from 'pages/artists/editor'

export default class CreateArtistPage extends React.Component {
  componentWillMount() {}

  render() {
    return (
      <div>
        <Helmet title="Create artist page" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Create artist page</strong>
            </div>
          </div>
          <div className="card-body">
            <ArtistEditor />
          </div>
        </div>
      </div>
    )
  }
}
