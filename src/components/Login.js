import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions';
import AuthForm from './AuthForm';

class Signup extends React.Component {

    onSubmit = (formValues) => {
        this.props.logIn(formValues)
    }

    render() {
        return (
            <div>
                <h3>Log In</h3>
                <AuthForm onSubmit={this.onSubmit} authMode='LogIn' />
            </div>    
        )
    }  
}


export default connect(null, { logIn })(Signup)