import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct, createOrder } from '../../actions';
import { Field, reduxForm } from 'redux-form';

class ProductDetail extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params

        this.props.fetchProduct(id);
    }

    renderError = ({ error, touched }) => {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        let formData = {
            quantity: formValues.quantity,
            productId: this.props.match.params.id
        }  
        this.props.createOrder(formData)
    }   


    render() {
        if(!this.props.product) {
            return <div>loading...</div>
        }

        const { name, price, productImage } = this.props.product

        return (
            <div>
                <img style={{width:'120px'}} src={`http://localhost:3002/${productImage}`} alt={productImage} />
                <h1>{name}</h1>
                <h5>{price}</h5>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                    <div style={{width: '80px'}}>
                    <Field  name="quantity" component={this.renderInput} label="Enter amount"/>
                    </div>
                    <button style={{marginTop: '10px', marginBottom: '10px'}}className="ui green button">
                        Purchase
                    </button>            
                </form>
                
            </div>
        )
    } 
}

const validate = (formValues) => {
    
    const errors = {}

    if(!formValues.quantity) {
        errors.quantity = 'You must enter a quantity'
    }

    return errors
}

const mapStateToProps = (state, ownProps) => {
    return {
        product: state.products[ownProps.match.params.id]
    }
}

export default reduxForm({
    form: 'productDetail',
    validate: validate
})(connect(mapStateToProps, {fetchProduct, createOrder})(ProductDetail));