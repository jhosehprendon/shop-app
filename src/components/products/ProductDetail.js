import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../actions';

class ProductDetail extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params

        this.props.fetchProduct(id);
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
            </div>
        )
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        product: state.products[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchProduct})(ProductDetail);