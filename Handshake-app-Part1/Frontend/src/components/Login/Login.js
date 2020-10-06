import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { updateLoginInfo } from "../../js/actions/index";
import Constants from '../../index';
import { RadioGroup, Radio } from 'react-radio-group';

//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            id: "",
            selectedOption: "student",
            authFlag: false,
            error: ""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        // this.userTypeChangeHandler = this.userTypeChangeHandler.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleOptionChange(value) {
        this.setState({
            selectedOption: value
        });
    }


    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //console.log("Inside Submit");

        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            selectedOption: this.state.selectedOption
        }

        axios.defaults.withCredentials = true;

        axios.post(`${Constants.BACKEND_URL}/login`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log("response(in Login UI) received", response.data);
                if (response.status === 200) {
                    console.log("authenticated in Login page!", this.state);
                    this.setState({
                        authFlag: true,
                        id: this.state.selectedOption === "student" ? response.data.id_student : response.data.id_company
                    })
                    var payload = {
                        id: this.state.id,
                        userType: this.state.selectedOption

                    }
                    this.props.updateLoginInfo(payload);
                }
            });

    }

    render() {
        let redirectVar = null;
        if (this.state.id) {
            console.log("Inside Login cookie load", this.state);
            //if its a student go to profile else go to jobs page!
            if (this.state.selectedOption === "student") {
                redirectVar = <Redirect to="/profile" />
            }
            else {
                //redirectVar = <Redirect to="/profile" />
                redirectVar = <Redirect to="/company/profile" />
            }
        }
        else {
            console.log("Login -> not authenticated");
        }
        return (
            <div>
                {redirectVar}
                <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Admin Login</h2>
                                <p>Please enter your username and password</p>
                            </div>

                            <div class="form-group">
                                <input onChange={this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                            </div>
                            <br />
                            <RadioGroup
                                name="role"
                                selectedOption={this.state.selectedOption}
                                onChange={this.handleOptionChange}>
                                <label><Radio value="student" />Student</label>
                                <label> <Radio value="company" />Company</label>
                            </RadioGroup>
                            <br />
                            <div>
                                {this.state.error}
                            </div>
                            <button onClick={this.submitLogin} class="btn btn-primary">Login</button>
                            <div >  <Link to="/signUp">New User? SignUp</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    console.log("Updating redux login info...");
    return {
        updateLoginInfo: loginInfo => dispatch(updateLoginInfo(loginInfo))
    };
}

export default connect(null, mapDispatchToProps)(Login);
