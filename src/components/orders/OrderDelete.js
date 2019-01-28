import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchOrder, deleteOrder } from '../../actions';

class OrderDelete extends React.Component {

    componentDidMount() {
        this.props.fetchOrder(this.props.match.params.id)
    }

    renderActions() {
       return (
            <React.Fragment>
                <button onClick={() => this.props.deleteOrder(this.props.match.params.id)} className="ui negative button">Delete Order</button>
                <Link className="ui button" to={'/orders'}>Cancel</Link>
            </React.Fragment> 
       )       
    }

    renderContent() {
        return 'Are you sure you want to delete this order?'
    }

    render() {
        return (
            <Modal 
                title= 'Delete Order'
                content= {this.renderContent()}
                actions= {this.renderActions()}
                onDismiss= {() => history.push('/orders')}
            />
        )
    }  
}

const mapStateToProps = (state, ownProps) => {
    return {
        order: state.orders[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchOrder, deleteOrder})(OrderDelete);