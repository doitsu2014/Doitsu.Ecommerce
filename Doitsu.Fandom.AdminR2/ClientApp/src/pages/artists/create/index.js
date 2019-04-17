import React from 'react'
import { Helmet } from 'react-helmet'
import ArtistEditor from 'pages/artists/editor'
import { connect } from 'react-redux'

@connect(({ artist }) => ({ artist }))
export default class CreateArtistPage extends React.Component {
  componentWillMount() {}

  render() {
    const defaultArtistId = -1
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
            <ArtistEditor defaultTrackingId={defaultArtistId} />
          </div>
        </div>
      </div>
    )
  }
}
