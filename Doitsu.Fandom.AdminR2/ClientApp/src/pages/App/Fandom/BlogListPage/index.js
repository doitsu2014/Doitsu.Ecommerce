import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import BlogList from './BlogList'

class BlogListPage extends React.Component {
    static defaultProps = {
        pathName: 'Danh sách bài viết',
        roles: ['Administrator','BrandManager']
    };

    render() {
        const props = this.props;
        return (
            <Page {...props}>
                <Helmet title="Danh sách bài viết"/>
                <BlogList/>
            </Page>
        );
    }
}

export default BlogListPage