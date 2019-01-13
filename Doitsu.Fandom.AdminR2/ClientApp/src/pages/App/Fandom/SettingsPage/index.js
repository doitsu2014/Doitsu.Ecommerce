import React from 'react'
import Helmet from 'react-helmet'
import Page from 'components/LayoutComponents/Page'
import SettingSlider from './SettingSlider'

class SettingsPage extends React.Component {
    static defaultProps = {
        // pathName: this.pageTitle,
        pathName: 'Cấu hình chung',
        roles: ['Administrator', 'BrandManager']
    }

    render() {
        const props = this.props;
        return (
            <Page {...props}>
                <Helmet title={this.pageTitle} />
                <SettingSlider />
            </Page>
        );
    }

}

export default SettingsPage