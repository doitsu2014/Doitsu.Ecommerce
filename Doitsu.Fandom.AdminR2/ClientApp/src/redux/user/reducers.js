import actions from './actions'

const initialState = {
  token: '',
  name: '',
  email: '',
  role: '',
  roles: '',
  validTo: '',
  validFrom: '',
  authorized: false,
  loading: false,
}

// export default userReducer
// using sagas instead of
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
