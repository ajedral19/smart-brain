import React from 'react';
import './Navigation.scss';

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if (isSignedIn){
            return(
                <nav className="navigation">
                    <p onClick={() => onRouteChange('signout')} className="nav-link">Sign Out</p>
                </nav>
            )
        }else{
            return(
                    <nav className="navigation">
                        <p onClick={() => onRouteChange('signin')} className="nav-link">Sign In</p>
                        <p onClick={() => onRouteChange('register')} className="nav-link">Register</p>
                    </nav>
            )
        }
}

export default Navigation;