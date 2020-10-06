import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from 'react-router';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import Constants from '../../index';

class Jobs extends Component {
    //Post Job openings (with job title, posting date, application deadline, location, salary, job description, job category – full time, part time, intern, on campus)

    constructor(props) {
        // console.log("Inside Jobs constructor");

        super(props);
        console.log("Properties are", props);
        // var company_payload = JSON.parse(localStorage.getItem('COMPANY_DATA'));
        // console.log("Jobs component constructor, login payload: ", company_payload);
        this.state = {
            jobTitle: '',
            jobDescription: '',
            postingDate: new Date(),
            applicationDeadline: new Date(),
            city: '',
            state: '',
            country: '',
            salary: '',
            jobCategory: '',
            idCompany: props.idCompany,
            edit: false,
            authFlag: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.postingDateHandler = this.postingDateHandler.bind(this);
        this.applicationDeadlineHandler = this.applicationDeadlineHandler.bind(this);
    }


    componentWillReceiveProps(newProps) {
        console.log("my new props", newProps.idCompany)
        this.setState({
            idCompany: newProps.idCompany
        })
    }


    onChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }

    postingDateHandler(date) {
        this.setState({
            postingDate: date
        })
    }

    applicationDeadlineHandler(date) {
        this.setState({
            applicationDeadline: date
        })
    }
    onSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        //console.log("Inside Submit of Create Jobs");
        const companyObject = {
            jobTitle: this.state.jobTitle,
            jobDescription: this.state.jobDescription,
            postingDate: this.state.postingDate,
            applicationDeadline: this.state.applicationDeadline,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            salary: this.state.salary,
            jobCategory: this.state.jobCategory,
            idCompany: this.state.idCompany,
            error: '',
            authFlag: false
        };



        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        //console.log("before sending to backend companyObject is :", companyObject);
        axios.post(`${Constants.BACKEND_URL}/jobs/createJob`, companyObject)
            .then(response => {
                console.log("Created a new job, status code is : ", response);
                this.setRedirect();
            }
            );
    }

    setRedirect = () => {
        console.log("Setting redirect to true from CREATE EVENT to LIST");
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        console.log("Render Redirect CREATE EVENT to LIST");
        if (this.state.redirect) {
            return <Redirect to='/jobs/jobList' />
        }
    }

    render() {
        //console.log("Inside render of Jobs");
        return (
            <div>
                {this.renderRedirect()}
                <div class="container">
                    <form onSubmit={this.onSubmit} method="post">
                        Create Job
                        <div style={{ width: '30%' }} class="form-group">
                            Job Title <input type="text" required onChange={this.onChangeHandler} class="form-control" name="jobTitle" value={this.state.jobTitle} placeholder="Enter Job Title" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Job Description <input type="text" required onChange={this.onChangeHandler} class="form-control" name="jobDescription" value={this.state.jobDescription} placeholder="Enter Job Description" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Posting Date: <DatePicker required selected={this.state.postingDate} onChange={this.postingDateHandler} name="postingDate" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Application Deadline: <DatePicker required selected={this.state.applicationDeadline} onChange={this.applicationDeadlineHandler} name="applicationDeadline" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            City:  <input type="text" onChange={this.onChangeHandler} class="form-control" name="city" value={this.state.city} placeholder="Enter City" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            State:  <input type="text" onChange={this.onChangeHandler} class="form-control" name="state" value={this.state.state} placeholder="Enter State" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Country:  <input type="text" onChange={this.onChangeHandler} class="form-control" name="country" value={this.state.country} placeholder="Enter Country" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Salary: <input type="text" onChange={this.onChangeHandler} class="form-control" name="salary" value={this.state.salary} placeholder="Enter Salary" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Job category: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="jobCategory" value={this.state.jobCategory} placeholder="Enter Job Category" />
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


const mapStateToProps = state => {
    // console.log("login info", state);
    return { idCompany: state.loginInfo.id }
}


export default connect(mapStateToProps, null)(Jobs);
