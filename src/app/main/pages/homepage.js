/*-
 * ⭐️ Homepage \o/
 *
-*/

import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from 'react-toolbox/lib/button'

class Homepage extends Component {
  render () {
    return (
      <section className="panel__homepage">
        <div className="homepage__container">
          <h1 className="homepage__message--welcome"> Hi Customer! </h1>

          <p className="homepage__message--orientation"> We are pretty glad to have you here, but please move forward because there's nothing here! </p>

          <Button onClick={this.props._proceed} label="Proceed" raised primary />
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  _proceed: () => push('/login/'),
}, dispatch)

export default connect(
  () => ({}),
  mapDispatchToProps,
)(Homepage)
