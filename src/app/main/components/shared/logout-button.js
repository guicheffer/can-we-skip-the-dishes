/*-
 * ⭐️ Simple Logout button
 *
-*/

import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'

import auth from '../../utils/auth'

class LogoutButton extends Component {
  render () {
    return (
      <Button
        className="panel__logout"
        label="Logout"
        onClick={this.props._redirect}
        raised accent
      />
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  _redirect: () => auth.deauthenticate(() => push('/')),
}, dispatch)

export default connect(
  () => ({}),
  mapDispatchToProps,
)(LogoutButton)
