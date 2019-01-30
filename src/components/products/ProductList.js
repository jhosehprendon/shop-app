import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../actions/index';

class ProductList extends React.Component {

    componentDidMount() {
        this.props.fetchProducts()
    }

    renderAdmin = (product) => {
        const currentUserId = localStorage.getItem('userId')
        if(product.userId === currentUserId && !!currentUserId) {
            return (
                <div className="right floated content">
                    <Link className="ui button basic primary " to={`/products/edit/${product._id}`}>Edit</Link>
                    <Link to ={`/products/delete/${product._id}`} className="ui button basic negative ">
                        Delete
                    </Link>
                </div>
            )
        }
    }

    renderList = () => {
        return this.props.products.map(product => {
            return (
                <div className="ui celled list">
                    <div className="ui items">
                        <div className="item" key={product._id}>
                            <div className="ui small image">
                                <img src={`http://localhost:3002/${product.productImage}`} alt={product.productImage} />
                            </div>
                            <div className="content">
                                <Link className="header" to={`/products/${product._id}`} className="header">
                                    {product.name}
                                </Link>
                                <div className="description">
                                    Price: ${product.price}
                                </div>
                                {this.renderAdmin(product)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderCreate = () => {
        if(this.props.isSignedIn) {
            return (
                <div style={{textAlign:'right'}}>
                    <Link to="/products/new" className="ui button primary">Create Product</Link>
                </div>
            )
        }
    }

    render() {
        if(!this.props.products) {
            return <div>loading...</div>
        }

        return (
            <div>
                <h2>Products</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        products: state.products.products,
        // currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchProducts})(ProductList);