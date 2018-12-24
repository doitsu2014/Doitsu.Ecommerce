import { createAction, createReducer } from 'redux-act'

const defaultPagination = {
    pageSizeOptions: ['10', '20'],
    showSizeChanger: true,
    current: 1,
    size: 'small',
    showTotal: (total) => `Total ${total} items`,
    total:0
}

const REDUCER = 'fandom'
const NS = `@@${REDUCER}/`

// Prepare artist actions
export const setArtistListState = createAction(`${NS}SET_ARTIST_LIST_STATE`);
export const setArtistEditUploadImagesState = createAction(`${NS}SET_ARTIST_EDIT_UPLOADIMAGES_STATE`);
export const setArtistEditState = createAction(`${NS}SET_ARTIST_EDIT_STATE`);
// Prepare product collection actions
export const setProductCollectionListState = createAction(`${NS}SET_PRODUCT_COLLECTION_LIST_STATE`);
export const setProductCollectionEditUploadImagesState = createAction(`${NS}SET_PRODUCT_COLLECTION_EDIT_UPLOADIMAGES_STATE`);
export const setProductCollectionEditState = createAction(`${NS}SET_PRODUCT_COLLECTION_EDIT_STATE`);
// Prepare product actions
export const setProductListState = createAction(`${NS}SET_PRODUCT_LIST_STATE`);
export const setProductEditState = createAction(`${NS}SET_PRODUCT_EDIT_STATE`);
export const setProductEditUploadImagesState = createAction(`${NS}SET_PRODUCT_EDIT_UPLOAD_IMAGES_STATE`)

const initialState = {
    artistListState: {
        tableData: [],
        data:[],
        pager: {...defaultPagination},
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        isFirstLoadTable: true
    },
    artistEditState: {
        isReloadInformation: false,
        isUpdate: false,
        id: -1,
        artistCode: '',
        artistName: '',
        artistAvatarUrl: '',
        uploadImages: {
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    },
    productListState: {
        tableData: [],
        data:[],
        pager: {...defaultPagination},
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        isFirstLoadTable: true,
        addVideoModalVisible: false,
        isUpdate:false,
        productEditState: {
            productId: null,
            productName: '',
            productCode: '',
            productResourceURL: '',
            productIsAuthorized: false,
            uploadImages: {
                previewVisible: false,
                previewImage: '',
                fileList: [],
            }
        }
    },
    productCollectionListState: {
        tableData: [],
        data:[],
        pager: {...defaultPagination},
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        isFirstLoadTable: true
    },
    productCollectionEditState: {
        isReloadInformation: false,
        isUpdate: false,
        isArtistType: true,
        id: null,
        productCollectionDescription: '',
        productCollectionName: '',
        productCollectionThumbnailUrl: '',
        productCollectionSlug: '',
        productCollectionArtistId: 1,
        productCollectionType: 1,
        productThumbnailUrl: '',
        listArtist: [],
        uploadImages: {
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }
}

export default createReducer({
    [setArtistListState]: (state, artistListState) => {
        artistListState = Object.assign({}, state.artistListState, artistListState)
        return { ...state, artistListState }
    },
    [setArtistEditUploadImagesState]: (state, uploadImages) => {
        let newState = { ...state };
        newState.artistEditState.uploadImages = {...uploadImages};
        return newState;
    },
    [setArtistEditState]:  (state, editState) => {
        let artistEditState = {...state.artistEditState, ...editState };
        let newState = { ...state, artistEditState };
        return newState;
    },
    [setProductCollectionListState]: (state, productCollectionListState) => {
        productCollectionListState = Object.assign({}, state.productCollectionListState, productCollectionListState)
        return { ...state, productCollectionListState }
    },
    [setProductCollectionEditUploadImagesState]: (state, uploadImages) => {
        let newState = { ...state };
        newState.productCollectionEditState.uploadImages = {...uploadImages};
        return newState;
    },
    [setProductCollectionEditState]:  (state, editState) => {
        let productCollectionEditState = {...state.productCollectionEditState, ...editState };
        let newState = { ...state, productCollectionEditState };
        
        return newState;
    },
    [setProductListState]: (state, productListState) => {
        productListState = Object.assign({}, state.productListState, productListState)
        return { ...state, productListState }
    },
    [setProductEditState]: (state, editState) => {
        let productEditState = {...state.productListState.productEditState, ...editState };
        let productListState = { ...state.productListState, productEditState };
        let newState = {...state, productListState};
        return newState;
    },
    [setProductEditUploadImagesState]: (state, uploadImages) => {
        let newState = { ...state };
        newState.productListState.productEditState.uploadImages = {...uploadImages};
        return newState;
    }
}, initialState)


