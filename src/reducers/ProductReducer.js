import {
    FETCH_PRODUCT,
    FETCH_PRODUCTS,
    CREATE_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT
} from '../actions/types'
import _ from 'lodash'

export default (state = {products:[]}, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS:
            return {...state, products: action.payload}
        case FETCH_PRODUCT:
            return {...state, [action.payload._id]: action.payload}
        case CREATE_PRODUCT:
            return {...state, [action.payload.id]: action.payload}
        case EDIT_PRODUCT:
            return {...state, [action.payload._id]: action.payload}
        case DELETE_PRODUCT:
            return _.omit(state, action.payload)
        default:
            return state
    }
}
