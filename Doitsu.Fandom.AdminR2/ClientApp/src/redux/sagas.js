import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import blog from './blog/sagas'
import artist from './artist/sagas'
import settingSlider from './settingSlider/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), settings(), blog(), artist(), settingSlider()])
}
