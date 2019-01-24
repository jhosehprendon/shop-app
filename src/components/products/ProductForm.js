import React from 'react';
import { Field, reduxForm } from 'redux-form';

class ProductForm extends React.Component {

    state = {
        productImage: null
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

    handleChange = (event) => {
        // console.log((event.target.files[0]))
        // const data = new FormData();
        // data.append('file', event.target.files[0]);
        // console.log(event.target.files[0])

        this.setState({
            productImage: event.target.files[0]
        })
    }

    renderInputFile = ({label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input type="file" onChange={this.handleChange}/>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        const userId = localStorage.getItem('userId')
        let formData = new FormData();
        formData.set('name', formValues.name)
        formData.set('price', formValues.price)
        formData.set('userId', userId)
        formData.set('productImage', this.state.productImage)

        this.props.onSubmit(formData)
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                <Field name="name" component={this.renderInput} label="Enter product name"/>
                <Field name="price" type="number" component={this.renderInput} label="Enter product price"/>
                <Field name="productImage" component={this.renderInputFile} />
                <button style={{marginTop: '15px'}} className="ui button primary">Submit Product</button>
            </form>
        )
    }  
}

const validate = (formValues) => {
    const errors = {}

    if(!formValues.name) {
        errors.name = 'You must enter a title'
    }

    if(!formValues.price) {
        errors.price = 'You must enter a description'
    }

    // if(!formValues.file) {
    //     errors.file = 'You must upload a product image'
    // }

    return errors
}


export default reduxForm({
    form: 'productForm',
    validate: validate
})(ProductForm);