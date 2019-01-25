import { SIGN_UP, LOG_IN, SIGN_OUT, CREATE_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, AUTH_ERROR, CHANGE_AUTH_NULL, CHANGE_AUTH_BACK } from './types';
import streams from '../apis/streams';
import history from '../history';

export const signUp = formValues => {
    return async dispatch => {
        try{
            await streams.post('http://localhost:3002/user/signup', {...formValues})
            dispatch({ type: SIGN_UP })
            dispatch(logIn(formValues))
        }
        catch {
            dispatch({ type: AUTH_ERROR })
        }
    }
}

export const logIn = formValues => {
    return async dispatch => {
        const response = await streams.post('http://localhost:3002/user/login', {...formValues})
        // console.log(response.data.token)
        // console.log(response.data.userId)
        dispatch({ type: LOG_IN })
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        history.push('/')
    }
}


export const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    history.push('/')
    return {
        type: SIGN_OUT
    } 
}

export const changeAuthNull = () => {
    return {
        type: CHANGE_AUTH_NULL
    }
}

export const changeAuthBack = () => {
    return {
        type: CHANGE_AUTH_BACK
    }
}

export const createProduct = formValues => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        const response = await streams.post('http://localhost:3002/products', formValues, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
        dispatch({ type: CREATE_PRODUCT, payload: response.data })
        history.push('/')
    }
}

export const fetchProducts = () => {
    return async dispatch => {
        const response = await streams.get('http://localhost:3002/products')
        dispatch({ type: FETCH_PRODUCTS, payload: response.data.products })
    }
}

export const fetchProduct = (id) => {
    return async dispatch => {
        const response = await streams.get(`http://localhost:3002/products/${id}`)
        dispatch({ type: FETCH_PRODUCT, payload: response.data.product })
    }
}

export const editProduct = (id, formValues) => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        const response = await streams.patch(`http://localhost:3002/products/${id}`, formValues, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
        dispatch({ type: EDIT_PRODUCT, payload: response.data })
        history.push('/')
    }
}

export const deleteProduct = (id) => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        await streams.delete(`http://localhost:3002/products/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
        dispatch({ type: DELETE_PRODUCT, payload: id })
        history.push('/')
    }
}