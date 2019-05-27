import actions from './actions'

const initialState = {
  loading: false,
  listSettingSlider: [],
  listSettingSliderPagination: {
    pageSizeOptions: ['10', '20'],
    showSizeChanger: true,
    current: 1,
    pageSize: 10,
    size: 'small',
    showTotal: total => `Total ${total} items`,
    total: 0,
  },
  updatingSlider: {},
}

export default function settingSliderReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
