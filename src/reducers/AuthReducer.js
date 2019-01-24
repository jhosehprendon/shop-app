import { LOG_IN, SIGN_UP, SIGN_OUT, AUTH_ERROR, CHANGE_AUTH_NULL,  CHANGE_AUTH_BACK} from '../actions/types'

const INITIAL_STATE = {
    isSignedIn: localStorage.getItem('token') !== null,
    userId: null,
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_UP:
            return { ...state, isSignedIn: true }
        case LOG_IN:
            return { ...state, isSignedIn: true }
        case AUTH_ERROR:
            return {...state, error: 'Email already exist'}
        case CHANGE_AUTH_NULL:
            return {...state, isSignedIn: null}
        case CHANGE_AUTH_BACK:
            return {...state, isSignedIn: localStorage.getItem('token') !== null}
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null }
        default: 
            return state
    }
}
