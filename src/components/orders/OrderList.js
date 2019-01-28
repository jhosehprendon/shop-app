import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders, deleteOrder } from '../../actions/index';

class OrderList extends React.Component {

    componentDidMount() {
        this.props.fetchOrders()
    }

    renderAdmin = (order) => {
            return (
                <div className="right floated content">
                    <Link to ={`/orders/delete/${order._id}`} className="ui button basic negative ">
                        Delete
                    </Link>
                </div>
            )
        
    }

    renderList = () => {
        return this.props.orders.map(order => {
            return (
                <div className="item" key={order._id}>
                    {this.renderAdmin(order)}
                    <div className="content">
                        <Link to={`/orders/${order._id}`} className="header">
                            {order.product.name}
                        </Link>
                        <div className="description">
                            {`${order.quantity} units`}
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <h2>My orders</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchOrders, deleteOrder})(OrderList);