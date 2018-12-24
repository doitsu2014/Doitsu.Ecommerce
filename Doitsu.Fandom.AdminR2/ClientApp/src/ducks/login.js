import { createReducer } from 'redux-act'
import * as app from './app'
import { message } from 'antd'

export const REDUCER = 'login'

export const submit = ({ username, password }: { username: string, password: string }) => (
  dispatch: Function,
  getState: Function,
) => {
  dispatch(app.addSubmitForm(REDUCER))
  app.login(username, password, dispatch)
  .then(data => {
    if (data) {
      dispatch(app.deleteSubmitForm(REDUCER))
    } else {
      dispatch(app.deleteSubmitForm(REDUCER))
      message.error('Sai tên đăng nhập hoặc mật khẩu!')
    }
  })
}

const initialState = {}
export default createReducer({}, initialState)