import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Constants from '../../index';

class CompanySignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            city: '',
            state: '',
            country: '',
            description: '',
            email: '',
            phoneNumber: '',
            password: '',
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
        console.log("Inside Submit of Company SignUp");
        const companyObject = {
            companyName: this.state.companyName,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            description: this.state.description,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            password: this.state.password,
            error: '',
            authFlag: false
        };

        console.log(companyObject);

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${Constants.BACKEND_URL}/company/signUp`, companyObject)
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
                    <form onSubmit={this.onSubmit} method="post">
                        SignUp Page
                        <div style={{ width: '30%' }} class="form-group">
                            Company Name:  <input type="text" required onChange={this.onChangeHandler} class="form-control" name="companyName" value={this.state.companyName} placeholder="Enter Company Name" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Description: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="description" value={this.state.description} placeholder="Enter description" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Email: <input type="email" required onChange={this.onChangeHandler} class="form-control" name="email" value={this.state.email} placeholder="Email id" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Phone Number: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="phoneNumber" value={this.state.phoneNumber} placeholder="Enter Phone Number" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Password:   <input type="password" required onChange={this.onChangeHandler} class="form-control" name="password" value={this.state.password} placeholder="Password" />
                        </div>
                        <br />

                        <div style={{ width: '30%' }} class="form-group">
                            City:  <input type="text" required onChange={this.onChangeHandler} class="form-control" name="city" value={this.state.city} placeholder="Enter City" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            State:  <input type="text" required onChange={this.onChangeHandler} class="form-control" name="state" value={this.state.state} placeholder="Enter State" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Country:  <input type="text" required onChange={this.onChangeHandler} class="form-control" name="country" value={this.state.country} placeholder="Enter Country" />
                        </div>
                        <br />
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

export default CompanySignUp;