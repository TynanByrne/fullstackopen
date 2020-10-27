const initialState = {
  filterTerm: ''
}

export const filter = (filterTerm) => {
  return {
    type: 'FILTER',
    data: {
      filterTerm
    }
  }
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.data
    default:
      return state
  }
}

export default filterReducer