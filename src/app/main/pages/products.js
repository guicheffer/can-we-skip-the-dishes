import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'react-toolbox'
import { Helmet } from 'react-helmet'

// eslint-disable-next-line no-undef
const browser = window

const ProductItem = product => (<li> {product.name} </li>)

class Listing extends Component {
  render () {
    const { products } = this.props

    return (
      <section className="panel__products">
        <Helmet>
          <title> Products - { this.metaTitle } </title>
        </Helmet>

        <h1 className="products__welcome"> Hello, Customer! </h1>

        <div className="products__orientation">
          <p> Please select the products as many as you want!  </p>
          <p> After that, you will be able to checkout your cart! 🙂 </p>
        </div>

        <div className="products__list--wrapper">
          { products.length ? <ul className="products__list">
          { products.map((product, key) => <ProductItem key={key} {...product}/>) }
          </ul> : <ProgressBar mode="indeterminate" type="circular" multicolor /> }
        </div>
      </section>
    )
  }

  componentWillMount () {
    const { metaTitle } = browser.getInitializationData()
    this.metaTitle = metaTitle
  }
}

const mapStateToProps = state => ({ products: state.products })

export default connect(
  mapStateToProps,
  () => ({}),
)(Listing)
