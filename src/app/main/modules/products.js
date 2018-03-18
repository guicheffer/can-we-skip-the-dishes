import axios from 'axios'

import endpoint from '../utils/endpoint-url'

export const REQUESTED = 'products/REQUESTED'
export const SUCCESS = 'products/SUCCESS'
export const ADD_TO_CART = 'products/ADD_TO_CART'
export const REMOVE_FROM_CART = 'products/REMOVE_FROM_CART'
export const ORDER_REQUESTED = 'products/ORDER_REQUESTED'

const initialState = {
  cart: [],
  list: [],
}

// eslint-disable-next-line no-undef
const browser = window

const DEFAULT_ALERT_MESSAGE = '⚠️ Sorry for the alert, but there was an error loading the products :('

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED: {
      return { ...state }
    }

    case SUCCESS: {
      const { data } = action

      return {
        ...state,
        ...data,
      }
    }

    case ADD_TO_CART: {
      const { id } = action
      const { cart = [] } = state

      return {
        ...state,
        cart: [...cart, id],
      }
    }

    case REMOVE_FROM_CART: {
      const { id: productId } = action
      const { cart } = state

      return {
        ...state,
        cart: [...cart.filter(id => (id !== productId))],
      }
    }

    case ORDER_REQUESTED: {
      return {
        ...state,
        isOrderRequested: true,
      }
    }

    default:
      return state
  }
}

export const getProducts = () => {
  const trigger = (dispatch) => {
    dispatch({
      type: REQUESTED,
    })

    axios.get(`${endpoint('Product')}`)
      .then((res) => {
        const { data: list } = res

        dispatch({
          data: { list },
          type: SUCCESS,
        })
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        browser.alert(DEFAULT_ALERT_MESSAGE)
      })
  }

  return trigger
}

export const toggleOnCart = (id, value) => {
  const trigger = (dispatch) => {
    let type

    if (value) type = ADD_TO_CART
    else type = REMOVE_FROM_CART

    dispatch({ type, id })
  }

  return trigger
}

export const checkoutCart = (products, total) => {
  const trigger = (dispatch) => {
    dispatch({
      type: ORDER_REQUESTED,
    })

    axios.post(`${endpoint('Order')}`, {
      orderItems: products.map(product => ({ productId: product.id })),
      status: 'in progress',
      total,

      // mock post data 😞
      contact: 'x',
      deliveryAddress: 'y',
      storeId: 1, // lucky store
    })
      .then((res) => {
        console.log(res.data)
        // const { data: order } = res
        //
        // dispatch({
        //   data: { order },
        //   type: SUCCESS,
        // })
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        browser.alert(DEFAULT_ALERT_MESSAGE)
      })
  }

  return trigger
}
