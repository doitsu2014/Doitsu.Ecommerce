import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ProductCollectionList from './ProductCollectionList'

class ProductCollectionListPage extends React.Component {
    static defaultProps = {
        pathName: 'Danh sách album',
        roles: ['Administrator','BrandManager']
    };

    render() {
        const props = this.props;
        return (
            <Page {...props}>
                <Helmet title="Danh sách album"/>
                <ProductCollectionList/>
            </Page>
        );
    }
}

export default ProductCollectionListPage