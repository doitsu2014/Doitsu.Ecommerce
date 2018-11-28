import React from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import Page from 'components/LayoutComponents/Page'
import ArtistEdit from './ArtistEdit'


class ArtistEditPage extends React.Component {
    static defaultProps = {
        // pathName: this.pageTitle,
        pathName: 'Chỉnh sửa nghệ sĩ',
        roles: ['Administrator', 'BrandManager']
    }

    render() {
        const props = this.props;
        return (
            <Page {...props}>
                <Helmet title={this.pageTitle} />
                <ArtistEdit/>
            </Page>
        );
    }

}

export default ArtistEditPage