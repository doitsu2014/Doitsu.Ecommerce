import { createAction, createReducer } from 'redux-act'
import { push } from 'react-router-redux'
import { pendingTask, begin, end } from 'react-redux-spinner'
import { notification } from 'antd'
import configuration from 'configuration'

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

// Prepare actions
export const setArtistListState = createAction(`${NS}SET_ARTIST_LIST_STATE`);
export const setArtistEditUploadImagesState = createAction(`${NS}SET_ARTIST_EDIT_UPLOADIMAGES_STATE`);
export const setArtistEditState = createAction(`${NS}SET_ARTIST_EDIT_STATE`);

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
        id: -1,
        isUpdate: false,
        artistCode: '',
        artistName: '',
        artistAvatarUrl: '',
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
    }
}, initialState)


