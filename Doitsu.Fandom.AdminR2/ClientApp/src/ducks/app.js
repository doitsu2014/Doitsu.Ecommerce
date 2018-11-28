import { createAction, createReducer } from 'redux-act'
import { push } from 'react-router-redux'
import { pendingTask, begin, end } from 'react-redux-spinner'
import { notification } from 'antd'
import configuration from 'configuration'

import {getAuthorize} from 'apis/services/userService'

const REDUCER = 'app'
const NS = `@@${REDUCER}/`
const DEFAULT_PATH_NAME = "/artist"

const _setFrom = createAction(`${NS}SET_FROM`)
const _setLoading = createAction(`${NS}SET_LOADING`)
const _setHideLogin = createAction(`${NS}SET_HIDE_LOGIN`)

export const setUserState = createAction(`${NS}SET_USER_STATE`)
export const setUpdatingContent = createAction(`${NS}SET_UPDATING_CONTENT`)
export const setActiveDialog = createAction(`${NS}SET_ACTIVE_DIALOG`)
export const deleteDialogForm = createAction(`${NS}DELETE_DIALOG_FORM`)
export const addSubmitForm = createAction(`${NS}ADD_SUBMIT_FORM`)
export const deleteSubmitForm = createAction(`${NS}DELETE_SUBMIT_FORM`)
export const setLayoutState = createAction(`${NS}SET_LAYOUT_STATE`)

export const setLoading = isLoading => {
  const action = _setLoading(isLoading)
  action[pendingTask] = isLoading ? begin : end
  return action
}

export const resetHideLogin = () => (dispatch, getState) => {
  const state = getState()
  if (state.pendingTasks === 0 && state.app.isHideLogin) {
    dispatch(_setHideLogin(false))
  }
  return Promise.resolve()
}

export const initAuth = roles => (dispatch, getState) => {
  // Use Axios there to get User Data by Auth Token with Bearer Method Authentication
  const userRoles = window.localStorage.getItem('app.Roles') ? window.localStorage.getItem('app.Roles').split(',') : '';
  const userEmail = window.localStorage.getItem('app.Email')
  const state = getState()
  
  const setUser = userState => {
    dispatch(
      setUserState({
        userState: {
          ...userState,
        },
      }),
    );
    
    let isUserInRole = !!roles.find(role => {
      return !!userRoles.find(userRole => {
        return userRole === role	
      })
    });

    // if user is not in role will dispatch
    if (!isUserInRole) {
      if (!(state.routing.location.pathname === DEFAULT_PATH_NAME)) {
        dispatch(push(DEFAULT_PATH_NAME))
      }
      return Promise.resolve(false)
    }
    // if user is in role true
    return Promise.resolve(true)
  }

  if(userRoles && userRoles.find(ur => ur === 'Administrator')) 
  {
    return setUser({email: userEmail, role: 'Administrator'})
  }
  else 
  {
    const location = state.routing.location
    const from = location.pathname + location.search
    dispatch(_setFrom(from))
    dispatch(push('/login'))
    return Promise.reject()
  }
}

export async function login(username, password, dispatch) {
  // Use Axios there to get User Auth Token with Basic Method Authentication
  // Token type: {token: "value", validTo: "value", email: "value", roles: []}
  let res = await getAuthorize(username,password);

  if(res && res.token) {
    window.localStorage.setItem('app.Authorization', `Bearer ${res.token}`)
    window.localStorage.setItem('app.Email', res.email)
    window.localStorage.setItem('app.Roles', res.roles)
    dispatch(_setHideLogin(true))
    dispatch(push(DEFAULT_PATH_NAME))
    notification.open({
      type: 'success',
      message: 'Bạn đã đăng nhập thành công!',
      description:
        'Chào mừng đến vói trang quản trị YGFL',
    })
    return true;
  }

  if (username === 'admin@mediatec.org' && password === '123123') {
    window.localStorage.setItem('app.Authorization', '')
    window.localStorage.setItem('app.Role', 'administrator')
    dispatch(_setHideLogin(true))
    dispatch(push('/dashboard/alpha'))
    notification.open({
      type: 'success',
      message: 'You have successfully logged in!',
      description:
        'Welcome to the Clean UI Admin Template. The Clean UI Admin Template is a complimentary template that empowers developers to make perfect looking and useful apps!',
    })
    return true
  }

  if (username === 'agent@mediatec.org' && password === '123123') {
    window.localStorage.setItem('app.Authorization', '')
    window.localStorage.setItem('app.Role', 'agent')
    dispatch(_setHideLogin(true))
    dispatch(push('/dashboard/alpha'))
    notification.open({
      type: 'success',
      message: 'You have successfully logged in!',
      description:
        'Welcome to the Clean UI Admin Template. The Clean UI Admin Template is a complimentary template that empowers developers to make perfect looking and useful apps!',
    })
    return true
  }

  dispatch(push('/login'))
  dispatch(_setFrom(''))
  

  return false
}

export const logout = () => (dispatch, getState) => {
  dispatch(
    setUserState({
      userState: {
        email: '',
        role: '',
      },
    }),
  )
  window.localStorage.setItem('app.Authorization', '')
  window.localStorage.setItem('app.Roles', '')
  dispatch(push('/login'))
}

const initialState = {
  // APP STATE
  from: '',
  isUpdatingContent: false,
  isLoading: false,
  activeDialog: '',
  dialogForms: {},
  submitForms: {},
  isHideLogin: false,

  // LAYOUT STATE
  layoutState: {
    isMenuTop: false,
    menuMobileOpened: false,
    menuCollapsed: false,
    menuShadow: true,
    themeLight: true,
    squaredBorders: false,
    borderLess: true,
    fixedWidth: false,
    settingsOpened: false,
  },

  // USER STATE
  userState: {
    email: '',
    role: '',
  },
}

export default createReducer(
  {
    [_setFrom]: (state, from) => ({ ...state, from }),
    [_setLoading]: (state, isLoading) => ({ ...state, isLoading }),
    [_setHideLogin]: (state, isHideLogin) => ({ ...state, isHideLogin }),
    [setUpdatingContent]: (state, isUpdatingContent) => ({ ...state, isUpdatingContent }),
    [setUserState]: (state, { userState }) => ({ ...state, userState }),
    [setLayoutState]: (state, param) => {
      const layoutState = { ...state.layoutState, ...param }
      const newState = { ...state, layoutState }
      window.localStorage.setItem('app.layoutState', JSON.stringify(newState.layoutState))
      return newState
    },
    [setActiveDialog]: (state, activeDialog) => {
      const result = { ...state, activeDialog }
      if (activeDialog !== '') {
        const id = activeDialog
        result.dialogForms = { ...state.dialogForms, [id]: true }
      }
      return result
    },
    [deleteDialogForm]: (state, id) => {
      const dialogForms = { ...state.dialogForms }
      delete dialogForms[id]
      return { ...state, dialogForms }
    },
    [addSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms, [id]: true }
      return { ...state, submitForms }
    },
    [deleteSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms }
      delete submitForms[id]
      return { ...state, submitForms }
    },
  },
  initialState,
)
