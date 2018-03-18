/*-
 * ⭐️ Cart simple view
 *
-*/

import React, { Component } from 'react'
import { Button } from 'react-toolbox'

import CartItems from './cart-items'

const DEFAULT_ICON = '🛒'

class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = { cart: false }
  }

  render () {
    const { cart, products: list } = this.props
    const products = this._getProductsInList(cart, list)
    const totalPrice =
      products.reduce((init, finalProduct) =>
        (init + finalProduct.price), 0).toFixed(2).replace('.', ',')

    return (
      <div className="panel__cart">
        <Button
          raised accent
          className="cart__action"
          label={`${DEFAULT_ICON} (${cart.length})`}
          onClick={this._handleCart.bind(this)}
        />

        <CartItems
          _handleCart={this._handleCart.bind(this)}
          isActive={this.state.cart}
          products={products}
          totalPrice={totalPrice}
        />
      </div>
    )
  }

  _getProductsInList (cart, list) {
    return list.filter(product => (cart.indexOf(product.id) !== -1))
  }

  _handleCart () { this.setState({ cart: !this.state.cart }) }
}

export default Cart
