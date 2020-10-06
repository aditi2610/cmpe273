import React, { Component } from 'react';

import { connect } from "react-redux";
import axios from 'axios';
import './../../css/profile.css';
import './../../css/application.css';
import './../../css/chunk.css';
import { Redirect } from 'react-router';
import Constants from '../../index';

class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        console.log("CompanyProfile => props inside constructor", props);
        this.state = {

            name: '',
            city: '',
            state: '',
            country: '',
            description: '',
            phoneNumber: '',
            hideButton: false,
            id_company: props.id_company,
            userType: props.userType,
            edit: false,
            redirect: false,
            uploadStatus: false
        };

        //console.log("state in constructor ", this.state);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log("my new props", newProps);
        console.log("my new props is_student", newProps.id_company);
        console.log("my new props userType", newProps.userType);
        this.setState({
            id_company: newProps.id_company,
            userType: newProps.userType,
        },
            this.loadData)
    }

    componentDidMount() {

        this.loadData()
    }




    loadData() {
        axios.defaults.withCredentials = true;
        var company_payload = {
            id: this.state.id_company
        }

        console.log("Before CompanyProfile ", company_payload);
        axios.post(`${Constants.BACKEND_URL}/company/getCompanyDetails`, company_payload)
            .then(response => {
                console.log("Inside Company details", response.data);
                if (response.data) {
                    this.setState({
                        name: response.data.company_name,
                        city: response.data.city,
                        state: response.data.state,
                        country: response.data.country,
                        description: response.data.description,
                        phoneNumber: response.data.phone_number,
                        edit: false
                    })
                    console.log(this.state);
                }

            })
            .catch(error => {
                console.log("Error in CompanyProfile ", error);
            })
    }

    onChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });

    }

    onClickHandler = (e) => {
        console.log("CompanyProfile => Inside onClickHandler");
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
        console.log("CompanyProfile => inside submit  ");
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        const companyObject = {
            description: this.state.description,
            phoneNumber: this.state.phoneNumber,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            id_company: this.state.id_company,
            edit: false,
        };
        console.log("before sending data to user", companyObject);
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${Constants.BACKEND_URL}/company/updateCompanyDetails`, companyObject)
            .then(response => {
                console.log("Company Profile => response", response);
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setRedirect();
                }
            });
    }

    setRedirect = () => {
        console.log("CompanyProfile => Setting redirect");
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        console.log("CompanyProfile => Render Redirect ");
        if (this.state.redirect) {
            return <Redirect to='/company/landingPage' />
        }
    }

    render() {
        console.log("CompanyProfile => render")
        if (this.state.edit) {
            return (
                <div>
                    {this.renderRedirect()}
                    <h1> Update Company Details </h1>
                    <br />
                    <div class="container">
                        <form onSubmit={this.onSubmit} method="post">
                            <div style={{ width: '30%' }} class="form-group">
                                Description <input type="text" required onChange={this.onChangeHandler} class="form-control" name="description" value={this.state.description} />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Phone Number: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="phoneNumber" value={this.state.phoneNumber} />
                            </div>

                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                City: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="city" value={this.state.city} />
                            </div>

                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                State: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="state" value={this.state.state} />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Country: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="country" value={this.state.country} />
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
                    {this.renderRedirect()}
                    <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr"> Company Information </h2>
                    <br />
                    <div class="container">

                        <form onSubmit={this.onSubmit} method="post">
                            <div class="style__flex___fCvpa style__justify-space-between___F3m5J">

                                <div class="style__flex-item___2eWZ4">
                                    <div class="style__heading-group___3uRpr">
                                        <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr">
                                            {this.state.name}
                                        </h2>
                                    </div>
                                </div>
                                <div>
                                    <button >View Jobs and Events</button>
                                </div>
                                <div class="style__flex-item___2eWZ4">
                                    <div class="style__edit-action___3rbYd">
                                        <svg aria-hidden="true" data-prefix="far" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16 icon" role="img" viewBox="0 0 512 512"></svg>
                                    </div>
                                </div>
                            </div>
                            <section class="student-education__details">
                                <div>
                                    <span class="student-profile-card__details-label">Description: </span>
                                    {this.state.description}
                                </div>
                                <br />
                                <div>
                                    <span class="student-profile-card__details-label">Phone Number: </span>
                                    {this.state.phoneNumber}
                                </div>
                                <br />
                                <div>
                                    <span class="student-profile-card__details-label">City: </span>
                                    {this.state.city}
                                </div>
                                <br />
                                <div>
                                    <span class="student-profile-card__details-label">State: </span>
                                    {this.state.state}
                                </div>
                                <br />
                                <div>
                                    <span class="student-profile-card__details-label">Country: </span>
                                    {this.state.country}
                                </div>
                            </section>
                            <br />
                            <div style={{ width: '30%' }}>
                                {this.state.hideButton ? null : <button onClick={this.onClickHandler} class="btn btn-success" type="button">Edit</button>}
                            </div>

                            <div>
                                {this.state.error}
                            </div>

                        </form>
                    </div>
                </div>
            )
        }

    }
}



const mapStateToProps = state => {
    //return  {username: state.loginInfo.username}
    console.log("my username", state.loginInfo.id)
    return { id_company: state.loginInfo.id, }
}


export default connect(mapStateToProps, null)(CompanyProfile);
//export default Profile;