/*-
 * ⭐️ Auth store
 *
 * This is the main entry file for login page
 *
 * ❗️❗️❗️ Token is not being comparable prod api
 *
-*/

import axios from 'axios'

import endpoint from './endpoint-url'

// eslint-disable-next-line no-undef
const browser = window

export default {
  token: null,

  _initialize () {
    axios.defaults.headers.post['Content-Type'] = 'application/json'
  },

  authenticate ({
    email,
    password,
    onSuccess,
    onFail,
  }) {
    this._initialize()

    axios.post(`${endpoint('Customer/auth')}?email=${email}&password=${password}`)
      .then((res) => {
        this.token = res.data
        axios.defaults.headers.common.Authorization = this.token
        browser.localStorage.setItem('can-we-skip-the-dishes-token', this.token)

        onSuccess()
      })
      .catch(() => {
        this.token = null
        delete axios.defaults.headers.common.Authorization
        browser.localStorage.removeItem('can-we-skip-the-dishes-token')
        onFail()
      })
  },

  getToken () {
    if (!this.token) {
      return browser.localStorage.getItem('can-we-skip-the-dishes-token') || null
    }

    return this.token
  },

  signout () {
    this.token = null
  },
}
