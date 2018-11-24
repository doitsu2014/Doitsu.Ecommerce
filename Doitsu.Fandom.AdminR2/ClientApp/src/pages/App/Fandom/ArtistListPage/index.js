import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ArtistList from './ArtistList'

class ArtistListPage extends React.Component {
    static defaultProps = {
        pathName: 'Danh sách nghệ sĩ',
        roles: ['Administrator']
    };

    render() {
        const props = this.props;
        return (
            <Page {...props}>
                <Helmet title="Danh sách nghệ sĩ"/>
                <ArtistList/>
            </Page>
        );
    }
}

export default ArtistListPage