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

import LogoutButton from '../components/logout-button'

import { getProducts } from '../modules/products'

// eslint-disable-next-line no-undef
const browser = window

const ProductItem = ({
  name,
  description,
  isLast,
  onChange,
}) => (
  <div>
    <ListCheckbox
      className="list__item"
      caption={name}
      legend={description}
      onChange={e => onChange(e)}
    />

    { !isLast ? <ListDivider /> : ''}
  </div>
)

class Listing extends Component {
  render () {
    const { products } = this.props

    return (
      <section className="panel__products">
        <Helmet>
          <title> Products - { this.metaTitle } </title>
        </Helmet>

        <h1 className="products__welcome"> Hello, Customer! </h1>
        <LogoutButton/>

        <div className="products__orientation">
          <p> Please select the products as many as you want!  </p>
          <p> After that, you will be able to checkout your cart! 🙂 </p>
        </div>

        <div className="products__list--wrapper">
          { products.length ? (
              <List className="products__list" selectable>
                { products.map((product, key) => (
                    <ProductItem
                      {...product}
                      isLast={(products.length - 1) === key}
                      key={key}
                      onChange={this._handleSelect}
                    />
                  ))
                }
              </List>
            ) : <ProgressBar mode="indeterminate" type="circular" />
          }
        </div>
      </section>
    )
  }

  _handleSelect (event) {
    console.log('oi', event)
  }

  componentWillMount () {
    const { metaTitle } = browser.getInitializationData()
    this.metaTitle = metaTitle

    this.props.getProducts()
  }
}

const mapStateToProps = state => ({ products: state.products })

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listing)
