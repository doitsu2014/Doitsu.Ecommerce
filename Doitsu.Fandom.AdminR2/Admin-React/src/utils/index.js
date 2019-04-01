import { isObject } from 'util'

export default class Utils {
  static GetCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('authorization')
      const user = JSON.parse(userStr)
      return user
    } catch (e) {
      console.log('Utils - get current user exception: ', e)
      return null
    }
  }

  static SetCurrentUser = authorization => {
    try {
      if (isObject(authorization)) {
        localStorage.setItem('authorization', JSON.stringify(authorization))
        return true
      }
      localStorage.setItem('authorization', authorization)
      return true
    } catch (e) {
      console.log('Utils - set current user exception: ', e)
      return false
    }
  }
}

export class FormUtils {
  /**
   * This utils to create rule is required and valid message to ant design form item
   */
  static CreateRuleIsRequried = message => ({ required: true, message })

  /**
   * This utils to create rule with reg exp pattern and valid message to ant design form item
   */
  static CreateRuleRegExp = (regexpStr, message) => {
    return (rule, value, callback) => {
      const regexp = new RegExp(regexpStr)
      if (!regexp.test(value)) {
        callback(message)
      } else {
        callback()
      }
    }
  }
}
