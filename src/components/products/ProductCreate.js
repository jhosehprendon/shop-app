import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import ProductForm from './ProductForm';

class ProductCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createStream(formValues)
    }

    render() {
        return (
            <div>
                <h3>Create a Product</h3>
                <ProductForm onSubmit={this.onSubmit} />
            </div>    
        )
    }  
}


export default connect(null, { createStream })(ProductCreate)