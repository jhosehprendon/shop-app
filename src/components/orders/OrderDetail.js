import React from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../../actions';

class OrderDetail extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params

        this.props.fetchOrder(id);
    }


    render() {
        if(!this.props.order) {
            return <div>loading...</div>
        }

        return (
            <div>
                <img style={{width:'120px'}} src={`http://localhost:3002/${this.props.order.product.productImage}`} alt={this.props.order.product.productImage} />
                <h1>{this.props.order.product.name}</h1>
                <h5>Quantity: {this.props.order.quantity}</h5>
                <h5>Total: ${this.props.order.product.price * this.props.order.quantity}</h5> 
            </div>
        )
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        order: state.orders[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchOrder})(OrderDetail);