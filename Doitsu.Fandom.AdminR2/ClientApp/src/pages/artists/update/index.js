import React from 'react'
import { Helmet } from 'react-helmet'
import ArtistEditor from 'pages/artists/editor'
import { connect } from 'react-redux'

@connect(({ artist }) => ({ artist }))
export default class UpdateArtistPage extends React.Component {
  render() {
    const { artist } = this.props
    return (
      <div>
        <Helmet title="Update artist page" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Update artist page</strong>
            </div>
          </div>
          <div className="card-body">
            <ArtistEditor defaultTrackingId={artist.trackingId} />
          </div>
        </div>
      </div>
    )
  }
}
