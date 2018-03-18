/*-
 * ⭐️ Products page
 *
 * This is the page where products are shown
 *
-*/

import _ from 'lodash'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  List,
  ListDivider,
  ListCheckbox,
  ProgressBar,
} from 'react-toolbox'

import LogoutButton from '../components/logout-button'

import {
  toggleOnCart,
  getProducts,
} from '../modules/products'

// eslint-disable-next-line no-undef
const browser = window

class Listing extends Component {
  render () {
    const { cart, list } = this.props.products

    return (
      <section className="panel__products">
        <Helmet>
          <title> Products - { this.metaTitle } </title>
        </Helmet>

        <h1 className="products__welcome"> Hello, Customer! </h1>
        <LogoutButton/>
        <p> length: { cart.length ? cart.length : '' }</p>

        <div className="products__orientation">
          <p> Please select the products as many as you want!  </p>
          <p> After that, you will be able to checkout your cart! 🙂 </p>

          <small className="products__orientation--sorry">
            ⚠️ Unfortunately, you can only check one item of each product.
              (We're still improving it)
          </small>
        </div>

        <div className="products__list--wrapper">
          { list.length ? (
              <List className="products__list" selectable ripple>
                { list.map((product, key) =>
                    this._createProduct(product, key, (list.length - 1)))
                }
              </List>
            ) : <ProgressBar mode="indeterminate" type="circular" />
          }
        </div>
      </section>
    )
  }

  _createProduct (product, key, total) {
    return (
      <div key={key}>
        <ListCheckbox
          className="list__item"
          checked={_.includes(this.props.products.cart, product.id)}
          caption={product.name}
          legend={product.description}
          onChange={value => this.props.toggleOnCart(product.id, value)}
        />

        { total !== key ? <ListDivider /> : ''}
      </div>
    )
  }

  componentWillMount () {
    const { metaTitle } = browser.getInitializationData()
    this.metaTitle = metaTitle

    this.props.getProducts()
  }
}

const mapStateToProps = state => ({
  products: state.products,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleOnCart,
  getProducts,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listing)
