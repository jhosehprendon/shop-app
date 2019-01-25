import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchProduct, deleteProduct } from '../../actions';

class ProductDelete extends React.Component {

    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id)
    }

    renderActions() {
       return (
            <React.Fragment>
                <button onClick={() => this.props.deleteProduct(this.props.match.params.id)} className="ui negative button">Delete</button>
                <Link className="ui button" to={'/'}>Cancel</Link>
            </React.Fragment> 
       )       
    }

    renderContent() {
        if(!this.props.stream) {
            return 'Are you sure you want to delete this product?'
        }

        return `Are you sure you want to delete this product with title: ${this.props.stream.title}`
    }

    render() {
        return (
            <Modal 
                title= 'Delete product'
                content= {this.renderContent()}
                actions= {this.renderActions()}
                onDismiss= {() => history.push('/')}
            />
        )
    }  
}

const mapStateToProps = (state, ownProps) => {
    return {
        product: state.products[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchProduct, deleteProduct})(ProductDelete);