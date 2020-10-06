import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import '../../css/application.css';
import '../../css/chunk.css';
import Constants from '../../index';

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}

class StudentContactDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            phoneNumber: '',
            hideButton: false,
            userType: props.userType,
            id_student: props.id_student,
            edit: false
        };

        this.emailHandler = this.emailHandler.bind(this);
        this.phoneNumberHandler = this.phoneNumberHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            id_student: newProps.id_student,
            userType: newProps.userType
        },
            this.loadData)
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const urlId = getQueryVariable("id")
        console.log("ContactInfo -> loadData -> requested profile id (from url): ", urlId);

        if (this.state.userType === 'company') {
            this.setState({
                hideButton: true
            })
        }
        var student_payload;
        if (urlId && urlId !== this.state.id_student) {
            this.setState({
                hideButton: true
            })
            student_payload = {
                id: urlId
            }

        }
        else {
            student_payload = {
                id: this.state.id_student
            }
        }

        axios.defaults.withCredentials = true;
        axios.post(`${Constants.BACKEND_URL}/studentContactInfo/getContactDetails`, student_payload)
            .then(response => {
                if (response.data) {
                    this.setState({
                        emailId: response.data.email_id,
                        phoneNumber: response.data.phone_number,
                        edit: false
                    })
                }

            })
            .catch(error => {
                console.log("Error in student Contact Info details ", error);
            })
    }


    emailHandler = (e) => {
        this.setState({
            emailId: e.target.value
        })
    }

    phoneNumberHandler = (e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    onClickHandler = (e) => {

        if (this.state.edit) {
            this.setState({
                edit: false
            })
        } else {
            this.setState({
                edit: true
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const studentObject = {
            emailId: this.state.emailId,
            phoneNumber: this.state.phoneNumber,
            id: this.state.id_student,
            edit: false
        };

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${Constants.BACKEND_URL}/studentContactInfo/saveContactDetails`, studentObject)
            .then(response => {
                console.log("Status Code : ", response.data);
            });
        this.setState({
            edit: false
        })

    }
    render() {
        if (this.state.edit) {
            return (
                <div>
                    <h1> Enter Contact Information </h1>
                    <br />
                    <div class="container">
                        <form onSubmit={this.onSubmit} method="post">
                            <div style={{ width: '30%' }} class="form-group">
                                Email id: <input type="email" required onChange={this.emailHandler} class="form-control" name="emailid" value={this.state.emailId} placeholder="Email Id" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Phone Number: <input type="text" required onChange={this.phoneNumberHandler} class="form-control" name="phoneNumber" value={this.state.phoneNumber} placeholder="Enter Phone Number" />
                            </div>
                            <br />
                            <div>
                                {this.state.error}
                            </div>
                            <div style={{ width: '30%' }}>
                                {this.state.hideButton ? null : <button class="btn btn-success" type="submit"> Save and Continue</button>}
                            </div>

                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div>

                    <div class="container">
                        <form onSubmit={this.onSubmit} method="post">
                            <div class="style__flex___fCvpa style__justify-space-between___F3m5J">
                                <h2 class="style__heading___29i1Z style__large___15W-p">Personal information</h2>
                            </div>
                            <div>
                                <div>
                                    <div class="student-personal-info__section">
                                        <div class="style__text___2ilXR style__fitted___1GslH style__bold___20lZi">
                                            Email Address:
                                    </div>
                                        <div class="style__text___2ilXR style__fitted___1GslH style__bold___20lZi">
                                            {this.state.emailId}
                                        </div>
                                    </div>
                                    <div class="student-personal-info__section">
                                        <div class="style__text___2ilXR style__fitted___1GslH style__bold___20lZi">
                                            Phone Number:
                                    </div>
                                        <div class="style__text___2ilXR style__fitted___1GslH style__bold___20lZi">
                                            {this.state.phoneNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '30%' }}>
                                {this.state.hideButton ? null : <button onClick={this.onClickHandler} class="btn btn-success" type="button">Edit</button>}
                            </div>

                        </form>
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = state => {

    return {
        id_student: state.loginInfo.id,
        userType: state.loginInfo.userType
    }
}

export default connect(mapStateToProps, null)(StudentContactDetails);