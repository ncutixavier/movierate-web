import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLogin: true

    }

    inputChanged = event => {
        let cred = this.state.credentials
        cred[event.target.name] = event.target.value
        this.setState({ credentials: cred })
    }

    loginClicked = event => {
        if (this.state.isLogin) {
            fetch(`${process.env.REACT_APP_API_URL}//auth/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.credentials)
            }).then(resp => resp.json())
                .then(res => {
                    console.log(res)
                    this.props.cookies.set('mr-token', res.token)
                    window.location.href = "/movies";
                })
                .catch(error => console.log(error))
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.credentials)
            }).then(resp => resp.json())
                .then(res => {
                    this.setState({ isLogin: true})
                })
                .catch(error => console.log(error))
        }
    }

    toggleView = () => {
        this.setState({ isLogin: !this.state.isLogin })
    }

    render() {
        return (
            <div className="login-container">
                <h1>
                    {this.state.isLogin ? 'Login' : 'Register'}
                </h1>
                <span>Username</span><br />
                <input type="text" name="username" value={this.state.credentials.username} onChange={this.inputChanged} /><br />
                <span>Password</span><br />
                <input type="password" name="password" value={this.state.credentials.password} onChange={this.inputChanged} /><br />

                {this.state.isLogin ?
                    <button onClick={this.loginClicked}>Login</button> :
                    <button onClick={this.loginClicked}>Register</button>
                }
                {this.state.isLogin ?
                    <p onClick={this.toggleView}>Create Account</p> :
                    <p onClick={this.toggleView}>Back to Login</p>
                }
            </div>
        )
    }
}

export default withCookies(Login)