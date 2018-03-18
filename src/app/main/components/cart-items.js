/*-
 * ⭐️ Cart items
 *
-*/

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Button,
  Drawer,
  List,
  ListItem,
} from 'react-toolbox'

import { checkoutCart } from '../modules/products'

import currencyPrefix from '../utils/currency-prefix'

const DEFAULT_ICON = '🛒'

class CartItems extends Component {
  render () {
    return (
      <Drawer
        className="can-we-skip-the-dishes__cart"
        active={this.props.isActive}
        onOverlayClick={this.props._handleCart}
      >
        <p className="cart__close" onClick={this.props._handleCart}> ❌ </p>
        <h4 className="cart__title">{DEFAULT_ICON} Your cart:</h4>

        <List className="cart__items">
        { this.props.products.map((product, index) => (
          <ListItem
            className="cart__item"
            caption={product.name}
            key={index}
            legend={product.description}
          />
        ))}
        </List>

        <div className="cart__footer">
        <p className="cart__total"> 💰 {currencyPrefix} {this.props.totalPrice} </p>

        { this.props.isOrderRequested ? 'Sending...' : ''}

        <Button
          raised accent
          className="cart__checkout"
          label="Checkout"
          onClick={this._handleCheckout.bind(this)}
        />
        </div>
      </Drawer>
    )
  }

  _handleCheckout () {
    // this.props.checkoutCart(this.props.products, this.props.totalPrice)
  }
}

const mapStateToProps = state => ({
  isOrderRequested: state.products.isOrderRequested,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  checkoutCart,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartItems)
