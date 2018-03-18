/*-
 * ⭐️ Get Endpoint helper
 *
 * This is a helper which helps us to get the endpoint url
 *
-*/

// eslint-disable-next-line no-undef
const browser = window
const { api } = browser.getInitializationData()

export default endpoint => `${api.url}${api.version}/${endpoint}`
