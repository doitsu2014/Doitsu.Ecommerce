import actions from './actions'

const initialState = {
  trackingId: -1,
}

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
