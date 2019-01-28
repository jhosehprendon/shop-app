import {
    FETCH_ORDER,
    FETCH_ORDERS,
    CREATE_ORDER,
    DELETE_ORDER
} from '../actions/types'
import _ from 'lodash'

const INITIAL_STATE = {
    orders:[]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_ORDERS:
            return {...state, orders: action.payload}
        case FETCH_ORDER:
            return {...state, [action.payload._id]: action.payload}
        case CREATE_ORDER:
            return {...state, [action.payload.id]: action.payload}
        // case EDIT_PRODUCT:
        //     return {...state, [action.payload._id]: action.payload}
        case DELETE_ORDER:
            console.log(action.payload)
            return _.omit(state, action.payload)
        default:
            return state
    }
}