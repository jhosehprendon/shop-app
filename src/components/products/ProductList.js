import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchStreams } from '../../actions/index'

class ProductList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams()
    }

    renderAdmin = (stream) => {
        if(stream.userId === this.props.currentUserId && !!this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link className="ui button primary " to={`/products/edit/${stream.id}`}>Edit</Link>
                    <Link to ={`/products/delete/${stream.id}`} className="ui button negative ">
                        Delete
                    </Link>
                </div>
            )
        }
    }

    renderList = () => {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/products/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">
                            {stream.description}
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
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchStreams})(ProductList);