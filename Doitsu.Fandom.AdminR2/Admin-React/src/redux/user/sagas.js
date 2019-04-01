import { all, takeEvery, put, call } from 'redux-saga/effects'
// import { notification } from 'antd'
import { loginByYGFL, currentAccountYGFL, currentAccount, logoutYGFL } from 'services/user'
import actions from './actions'

export function* LOGIN({ payload }) {
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(loginByYGFL, email, password)
  if (response) {
    // notification.response({
    //   message: 'Logged In',
    //   description: 'You have responsefully logged in to YGFL Admin',
    // });
    localStorage.setItem('authorization', JSON.stringify(response))
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
      payload: {},
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOAD_CURRENT_ACCOUNT_YGFL() {
  // start loading screen
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(currentAccountYGFL)
  if (response) {
    const { email, token, validTo, validFrom, roles } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        token,
        name: email,
        email,
        role: roles[0],
        roles,
        validTo,
        validFrom,
        authorized: true,
      },
    })
  }
  // end loading screen
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(currentAccount)
  if (response) {
    const { uid: id, email, photoURL: avatar } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        name: 'Administrator',
        email,
        avatar,
        role: 'admin',
        authorized: true,
      },
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield call(logoutYGFL)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      token: '',
      name: '',
      email: '',
      role: '',
      roles: '',
      validTo: '',
      validFrom: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT_YGFL),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT_YGFL(), // run once on app load to check user auth
  ])
}
