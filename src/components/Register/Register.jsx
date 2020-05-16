import React, { Component } from 'react'
import './Register.scss';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    onNameChange = (e) => {
        this.setState({ name: e.target.value })
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }


    // avoid returning the password from the backend.
    onSubmit = () => {
        fetch('http://localhost:8080/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user)
                console.log(user)
                this.props.onRouteChange('home')
            }
        })
    }

    render(){
        return(
            <>
                <div className="sign-in form-block">
                    <div className = "form">
                        <fieldset>
                            <legend>Register</legend>
                            <span className="line"></span>
                            <div className="field">
                                <label className="field-label" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange} className="name" name="name" type="text" placeholder="type your name" />
                            </div>
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
                            {/* <input className="" type="submit" value="Register" onClick={() => this.props.onRouteChange('home')} /> */}
                            <input className="" type="submit" value="Register" onClick={this.onSubmit} />
                            {/* <div className="form-options">
                                <a href="!#" className="">Register</a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Register