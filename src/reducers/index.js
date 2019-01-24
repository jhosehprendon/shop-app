import  { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import ProductReducer from './ProductReducer';

export default combineReducers({
    auth: AuthReducer,
    form: formReducer,
    products: ProductReducer
})