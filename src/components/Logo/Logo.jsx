import React, { Fragment } from 'react';
// import Tilt from 'react-tilt';
import './Logo.scss';
import brain from './brain.png';

const Logo = () => {
    return(
        <Fragment>
        <div className="logo-wrapper">
            <div className="logo">
                <div className="logo-inner">
                    <img src={brain} alt="logo"/>
                </div>
            </div>
            {/* <Tilt className="Tilt logo" options={{max : 15}} style={{ height: 80, width: 80 }} >
                <div className="Tilt-inner logo-inner">
                    <img src={brain} alt="logo"/>
                </div>
            </Tilt> */}
        </div>
        </Fragment>
    )
}

export default Logo;