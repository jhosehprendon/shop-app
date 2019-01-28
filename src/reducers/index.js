import  { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import ProductReducer from './ProductReducer';
import OrderReducer from './OrderReducer';

export default combineReducers({
    auth: AuthReducer,
    form: formReducer,
    products: ProductReducer,
    orders: OrderReducer
})