import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import ProductForm from './ProductForm';

class ProductEdit extends React.Component {
    
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render () {
        if(!this.props.stream) {
            return <div>loading...</div>
        }

        return (
            <div>
                <h3>Edit Product</h3>
                <ProductForm 
                    initialValues={{title: this.props.stream.title, description: this.props.stream.description}}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchStream, editStream})(ProductEdit);