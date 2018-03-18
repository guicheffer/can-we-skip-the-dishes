// export const ADD_ITEM = 'items/ADD_ITEM'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    // case ADD_ITEM: {
    //   const { name, species } = action.data.item
    //
    //   return [
    //     ...state,
    //     { name, species },
    //   ]
    // }

    default:
      return state
  }
}

// export const addItem = (item) => {
//   const trigger = (dispatch) => {
//     dispatch({
//       type: ADD_ITEM,
//       data: { item },
//     })
//   }
//
//   return trigger
// }
