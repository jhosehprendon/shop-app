import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp, changeAuthNull, changeAuthBack } from '../actions';
import AuthForm from './AuthForm';

class Signup extends React.Component {

    componentDidMount() {
        this.props.changeAuthNull()
    }

    componentWillUnmount() {
        this.props.changeAuthBack()
    }


    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.signUp(formValues)
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <AuthForm onSubmit={this.onSubmit} authMode='SignUp' />
                <div style={{color: 'red'}}>{this.props.authError}</div>
                <p>Already have an account?</p>
                <Link to={'/login'} className="header">Click Here</Link>
            </div>    
        )
    }  
}

const mapStateToProps = state => {
    return {
        authError: state.auth.error,
        isSignedIn: state.auth.isSignedIn
    } 
}


export default connect(mapStateToProps, { signUp, changeAuthNull, changeAuthBack })(Signup)