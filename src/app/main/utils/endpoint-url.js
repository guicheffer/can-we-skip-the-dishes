/*-
 * ⭐️ Get Endpoint helper
 *
 * This is a helper which helps us to get the endpoint url
 *
-*/

import axios from 'axios'

import auth from './auth'

// eslint-disable-next-line no-undef
const browser = window
const { api } = browser.getInitializationData()

if (auth.getToken()) axios.defaults.headers.common.Authorization = auth.getToken()

export default endpoint => `${api.url}${api.version}/${endpoint}`
