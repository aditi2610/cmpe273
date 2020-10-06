import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../index';
import { Redirect } from 'react-router';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            collegeName: '',
            error: '',
            authFlag: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    onChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });

    }


    onSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        console.log("Inside Submit of SignUp");
        const studentObject = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            collegeName: this.state.collegeName,
            password: this.state.password,
            email: this.state.email
        };

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${Constants.BACKEND_URL}/signUp`, studentObject)
            .then(response => {
                console.log("Status Code : ", response.status);
                this.setState({
                    authFlag: true,
                    cookie: response.cookie
                })
                //cookie.save('cookie', response.cookie.username, {maxAge: 900000, httpOnly: false, path : '/'})
            }
            );
    }
    render() {
        console.log("Inside render");
        let redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = <Redirect to="/profile" />
        }
        return (
            <div>
                {redirectVar}

                <br />
                <div class="container">
                    <form action="http://127.0.0.1:3000/signup" onSubmit={this.onSubmit} method="post">
                        SignUp Page
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="text" required onChange={this.onChangeHandler} class="form-control" name="firstName" value={this.state.firstName} placeholder="Enter First Name" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="text" required onChange={this.onChangeHandler} class="form-control" name="lastName" value={this.state.lastName} placeholder="Enter Last Name" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="userName" required onChange={this.onChangeHandler} class="form-control" name="username" value={this.state.userName} placeholder="Enter UserName" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="email" required onChange={this.onChangeHandler} class="form-control" name="email" value={this.state.email} placeholder="Emaili id" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="text" required onChange={this.onChangeHandler} class="form-control" name="collegeName" value={this.state.collegeName} placeholder="College Name" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="password" required onChange={this.onChangeHandler} class="form-control" name="password" value={this.state.password} placeholder="Password" />
                        </div>
                        <div>
                            {this.state.error}
                        </div>
                        <div style={{ width: '30%' }}>
                            <button class="btn btn-success" type="submit">Create</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp;