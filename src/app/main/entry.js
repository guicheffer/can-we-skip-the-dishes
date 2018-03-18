/*-
 * ⭐️ MainEntry
 *
 * This is the main entry file for can-we-skip-the-dishes spa ❤️.
 *
-*/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import store, { history } from '../core/store'

import AbstractEntry from '../core/entry'

import Homepage from './pages/homepage'
import Login from './pages/login'
import Products from './pages/products'

import auth from './utils/auth'

// eslint-disable-next-line no-undef
const browser = window

const PrivateRoute = ({ component: OweComponent, ...rest }) => (
  <Route {...rest} render={props => (
    auth.getToken() ? (<OweComponent {...props} />) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
    )
  )}/>
)

class MainEntry extends AbstractEntry {
  start ({ initilizationData }) {
    this.initilizationData = initilizationData
    this._giveInterviewer2NiceAndBeautifulGiantWelcomeMessages()

    this.ui = {
      app: browser.document.querySelector('#app-can-we-skip-the-dishes'),
    }

    this.render()
  }

  render () {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <main className="can-we-skip-the-dishes__panel">
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/login/" component={Login} />

              <PrivateRoute exact path="/products/" component={Products} />

              <Route component={() => (
                <section className="panel__error" data-error="404">4️⃣0️⃣4️⃣ 👉🏼 not found</section>
              )} />
            </Switch>
          </main>
        </ConnectedRouter>
      </Provider>,
      this.ui.app,
    )
  }

  _giveInterviewer2NiceAndBeautifulGiantWelcomeMessages () {
    // eslint-disable-next-line no-console
    console.log(
      this.initilizationData.welcomeMessage.hi,
      'background: #333; color: #FFF; font-size: 12px; padding: 12px;',
      'font-size: 12px; font-style: italic;',
      'font-weight: bold; text-transform: uppercase;',
    )
    // eslint-disable-next-line no-console
    console.log(this.initilizationData.welcomeMessage.link, 'font-weight: bold;', '')
  }
}

export default MainEntry
