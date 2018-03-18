/*-
 * ⭐️ Products page
 *
 * This is the page where products are shown
 *
-*/

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

import currencyPrefix from '../utils/currency-prefix'

import LogoutButton from '../components/shared/logout-button'
import Cart from '../components/cart'

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

        <div className="panel__header">
          { cart.length ? <Cart cart={cart} products={list}/> : '' }

          <LogoutButton/>
        </div>

        <div className="products__orientation">
          <p> Please select the products as many as you want!  </p>
          <p> After that, you will be able to checkout your cart! 🙂 </p>

          <small className="products__orientation--sorry">
            ⚠️ Unfortunately, you can only check one item for each product.
              (We're still improving it)
          </small>
        </div>

        <div className="products__list--wrapper">
          { list.length ? (
              <List className="products__list" selectable ripple>
                { list.map((product, index) =>
                    this._createProduct(product, index, (list.length - 1)))
                }
              </List>
            ) : <ProgressBar mode="indeterminate" type="circular" />
          }
        </div>
      </section>
    )
  }

  _createProduct (product, index, total) {
    const isSelected = this.props.products.cart.indexOf(product.id) !== -1

    return (
      <div key={index} className="list__individual">
        <ListCheckbox
          className="list__item"
          checked={isSelected}
          caption={product.name}
          legend={product.description}
          onChange={value => this.props.toggleOnCart(product.id, value)}
        />

        <span className="list__item--price">
          {currencyPrefix} {product.price.toLocaleString('en-CA')}
        </span>

        { total !== index ? <ListDivider /> : ''}
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
