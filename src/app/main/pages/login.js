import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Input, Button } from 'react-toolbox'

import auth from '../utils/auth'

// eslint-disable-next-line no-undef
const browser = window

const DEFAULT_DASHBOARD_URL = '/products/'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = { redirectToReferrer: false }
  }

  render () {
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (redirectToReferrer || auth.getToken()) {
      if (from.pathname && from.pathname !== '/') return <Redirect to={from} />

      return <Redirect to={DEFAULT_DASHBOARD_URL} />
    }

    return (
      <section className="panel__login">
        <Helmet>
          <title> Login - { this.metaTitle } </title>
        </Helmet>

        { from.pathname && from.pathname !== '/' ? <p className="login__error">❗️ You must login in to view this page at {from.pathname} </p> : '' }
        { this.state.failed ? (<p className="login__error">❗️ Please try again, credentials were not right!</p>) : '' }

        <form onSubmit={this._handleSubmit.bind(this)} className="login__credentials" method="get" action="/">
          <div className="login__field-group">
            <Input autoFocus onChange={this._handleChange.bind(this, 'email')} autoComplete="off" required type='email' label='Email' name='can-we-skip-the-dishes-email' />
          </div>

          <div className="login__field-group">
            <Input onChange={this._handleChange.bind(this, 'password')} autoComplete="off" required type='password' label='Password' name='can-we-skip-the-dishes-password' />
          </div>

          <Button type="submit" label="Login" disabled={this.state.isLoading} raised primary />
        </form>
      </section>
    )
  }

  _handleChange (name, value) {
    this.setState({
      ...this.state,
      [name]: value,
    })
  }

  _handleSubmit (e) {
    e.preventDefault()
    e.stopPropagation()

    this.setState({
      failed: false,
      isLoading: true,
    })

    const { email, password } = this.state

    auth.authenticate({
      email,
      password,
      onSuccess: () => {
        this.setState({
          ...this.state,
          redirectToReferrer: true,
        })
      },
      onFail: () => {
        console.log('not right')
        this.setState({
          ...this.state,
          failed: true,
          isLoading: false,
          redirectToReferrer: false,
        })
      },
    })

    return false
  }

  componentWillMount () {
    const { metaTitle } = browser.getInitializationData()
    this.metaTitle = metaTitle
  }
}

export default Login
