import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp, signOut } from '../actions';
import history from '../history';

class Auth extends React.Component {

    onSignOutClick = () => {
        this.props.signOut()
    }

    renderAuthButton() {
         if (this.props.isSignedIn) {
            return (
                <div>
                    <Link to="/orders" style={{display: 'inline', marginRight: '10px'}}>
                        My Orders
                    </Link>
                    <button onClick={this.onSignOutClick} className="ui blue button" style={styles.buttonStyle}>
                        Sign Out
                    </button>
                </div>
            )
        } else if (this.props.isSignedIn === null) {
            return null
        } else if (!this.props.isSignedIn) {
            return (
                <button onClick={() => history.push('/signup')} className="ui blue button" style={styles.buttonStyle}>
                    Sign Up
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const styles = {
    buttonStyle: {
        marginTop: '6px', 
        marginBottom: '6px'
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { signUp, signOut })(Auth)