import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct, createOrder } from '../../actions';
import { Field, reduxForm } from 'redux-form';

class ProductDetail extends React.Component {

    state = {
        totalAmount: 1
    }

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

    onSubmit = (formValues) => {
        let formData = {
            quantity: formValues.quantity,
            productId: this.props.match.params.id
        }  
        this.props.createOrder(formData)
    }   

    onChange = (event) => {
        this.setState({
            totalAmount: event.target.value 
        })
    }


    render() {
        if(!this.props.product) {
            return <div>loading...</div>
        }

        const { name, price, productImage } = this.props.product

        return (
            <div class="ui card" style={{margin: 'auto', marginTop: '50px'}}>
                <div class="image">
                    <img src={`http://localhost:3002/${productImage}`} alt={productImage} />
                </div>
                <div class="content">
                    <h1 class="header">{name}</h1>
                    <h5>Price: ${price}</h5>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <div style={{width: '100px'}}>
                        <Field class="ui dropdown" onChange={this.onChange} name="quantity" component='select' label="Enter quantity" style={{outline:'none'}}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Field>
                        </div>
                        <div>
                            Total: $ {this.state.totalAmount * price}
                        </div>
                        <button style={{marginTop: '10px', marginBottom: '10px'}}className="ui green button">
                            Purchase
                        </button>            
                    </form>
                </div>
                
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