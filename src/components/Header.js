import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth';

const Header = () => {
    return (
        <div className="ui sencondary pointing menu">
            <Link to="/" className="item">
                My Shop
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    All streams
                </Link>
                <Auth />
            </div>
        </div>
    )
}

export default Header