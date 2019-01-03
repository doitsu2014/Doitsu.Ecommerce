import React from 'react'
import Helmet from 'react-helmet'
import Page from 'components/LayoutComponents/Page'
import BlogEdit from './BlogEdit'


class BlogEditPage extends React.Component {
    static defaultProps = {
        pathName: 'Chỉnh sửa bài viết',
        roles: ['Administrator', 'BrandManager']
    }

    render() {
        const props = this.props;
        return (
            <Page {...props}>
                <Helmet title={this.pageTitle} />
                <BlogEdit/>
            </Page>
        );
    }

}

export default BlogEditPage