import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import artist from './artist/reducers'
import blogState from './blog/reducers'
import settingSliderState from './settingSlider/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    artist,
    blogState,
    settingSliderState,
  })
