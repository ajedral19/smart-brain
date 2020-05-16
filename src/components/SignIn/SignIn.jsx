import React, { Component } from 'react'
import './SignIn.scss';

class SignIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:8080/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render(){
        const { onRouteChange } = this.props;
        return(
            <>
                <div className="sign-in form-block">
                    <div className = "form">
                        <fieldset>
                            <legend>Sign In</legend>
                            <span className="line"></span>
                            <div className="field">
                                <label className="field-label" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="email" name="email-address" type="email" placeholder="type your email" />
                            </div>
                            <div className="field">
                                <label className="field-label" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="pword" name="password" type="password" placeholder="type your password" />
                            </div>
                            {/* <label className="c-box"><input type="checkbox" className="c-box-input" /> Remember me</label> */}
                        </fieldset>
                        <div className="submit">
                            {/* <input className="" type="submit" value="Sign In" onClick={() => onRouteChange('home')} /> */}
                            <input className="" type="submit" value="Sign In" onClick={this.onSubmitSignIn} />
                            <div className="form-options">
                                <p className="" onClick={()=>onRouteChange('register')}>Register</p>
                                {/* <a href="!#" className="">Forgot your password?</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SignIn