import { notification } from 'antd'

export default function notifyError(e, message = 'Hệ thống có lỗi xảy ra.', description = '') {
  const data = e.response
  if (data && data.status === 401) {
    notification.open({
      type: 'error',
      message: 'Thời gian đăng nhập của bạn đã tới hạn',
      description: 'Đăng xuất và đăng nhập lại',
    })
  } else {
    notification.open({
      type: 'error',
      message,
      description,
    })
  }
}
