// import action types that are required by the reducer
import { CREATE, READ, UPDATE, DELETE } from '../actions/actions'

// initial state for redux store
const initialState = {
  produits: Promise.resolve(),
  feteched: false
}

// reducer function
export default function (state = initialState, action) {
  console.log(action.type)
  switch (action.type) {
    // handless creation of data
    case CREATE: return {
      produits: [...state.produits, action.payload.Produit]
    }

      // reads all the data from the store
    case READ: {
      console.log(action)

      return {
        produits: action.payload,
        feteched: true
      } }

    // handles Produit updates in redux store
    case UPDATE: {
      return state
    }

    // handles Produit deletion from redux store
    case DELETE: {
      const { id } = action.payload

      return {
        produits: [...state.produits].filter((produit) => produit.id !== id)
      }
    }

    // returns default state, in case some unknown action type is discovered
    default: return state
  }
}
