import { all, takeEvery, put, call } from 'redux-saga/effects'
import { read } from 'services/settings'
import actions from './actions'

export function* GET_LIST_SLIDER({payload}) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      settingSliderloading: true,
    },
  })
  
  const response = yield call(read, payload)
  if (response) {
    const { data, totalFullData } = response
    console.log(response)
    yield put({
      type: actions.SET_STATE,
      payload: {
        listSettingSlider: data,
        listSettingSliderPagination: {
          total: totalFullData
        }
      },
    })
  }

  yield put({
    type: actions.SET_STATE,
    payload: {
      settingSliderloading: false,
    },
  })
}

export function* SETTING_SLIDER({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      settingSliderloading: true,
    },
  })
  console.log(payload)
  yield put({
    type: actions.SET_STATE,
    payload: {
      settingSliderloading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_LIST_SLIDER, GET_LIST_SLIDER),
    takeEvery(actions.SETTING_SLIDER, SETTING_SLIDER),
  ])
}
