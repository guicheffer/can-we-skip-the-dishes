import axios from 'axios'

import endpoint from '../utils/endpoint-url'

export const REQUESTED = 'products/REQUESTED'
export const SUCCESS = 'products/SUCCESS'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED: {
      return [...state]
    }

    case SUCCESS: {
      const products = action.data

      return [
        ...state,
        ...products,
      ]
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
        const { data } = res

        dispatch({
          data,
          type: SUCCESS,
        })
      })
  }

  return trigger
}
