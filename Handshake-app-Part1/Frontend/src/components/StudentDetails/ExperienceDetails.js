import React, { Component } from 'react';
import axios from 'axios';


import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Constants from '../../index';
import '../../css/application.css';
import '../../css/chunk.css';


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}

class ExperienceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            jobTitle: '',
            city: '',
            country: '',
            startDate: new Date(),
            endDate: new Date(),
            workDesc: '',
            id_student: props.id_student,
            userType: props.userType,
            hideButton: false,
            edit: false
        };
        this.startDateHandler = this.startDateHandler.bind(this);
        this.endDateHandler = this.endDateHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
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
        axios.defaults.withCredentials = true;

        const urlId = getQueryVariable("id")
        console.log("ExperienceDetails -> loadData -> requested profile id (from url): ", urlId);


        if (this.state.userType === 'company') {
            this.setState({
                hideButton: true
            })
        }

        //console.log("Inside componentDidMount");
        if (urlId && urlId !== this.state.id_student) {
            this.setState({
                hideButton: true
            })
            var student_payload = {
                id: urlId
            }

        }
        else {
            var student_payload = {
                id: this.state.id_student
            }
        }

        axios.post(`${Constants.BACKEND_URL}/studentExperience/getExperienceDetails`, student_payload)
            .then(response => {
                console.log("Inside Student Experience details componentMount", response.data);

                //console.log("S is ",MyDateTime);
                if (response.data) {
                    this.setState({
                        companyName: response.data.company_name,
                        jobTitle: response.data.jobTitle,
                        city: response.data.city,
                        country: response.data.country,
                        startDate: new Date(Date.parse(response.data.start_date)),
                        endDate: new Date(Date.parse(response.data.end_date)),
                        workDesc: response.data.work_description
                    })
                }

                //console.log("year is: ",this.state.startDate.getUTCFullYear());

            })
            .catch(error => {
                console.log("Error in student basic details ", error);
            })
    }

    startDateHandler(date) {
        this.setState({
            startDate: date
        })
    }
    endDateHandler(date) {
        this.setState({
            endDate: date
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
        console.log("Inside onClickHandler");
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

        const studentExpObject = {
            id: this.state.id_student,
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            city: this.state.city,
            country: this.state.country,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            workDesc: this.state.workDesc
        };

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${Constants.BACKEND_URL}/studentExperience/saveExperienceDetails`, studentExpObject)
            .then(response => {
                console.log("Status Code : ", response.status);
            });

        this.setState({
            edit: false
        })



    }
    render() {
        if (this.state.edit) {
            return (
                <div>
                    <h1> Enter Experience Details</h1>
                    <br />
                    <div class="container">
                        <form onSubmit={this.onSubmit} method="post">
                            <div style={{ width: '30%' }} class="form-group">
                                Company Name: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="companyName" value={this.state.companyName} placeholder="Enter Company Name" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Job Title: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="jobTitle" value={this.state.jobTitle} placeholder="Enter Job Title" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                City: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="city" value={this.state.city} placeholder="Enter City" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Country: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="country" value={this.state.country} placeholder="Enter country" />
                            </div>
                            <br />
                            <div>
                                Start Date: <DatePicker required selected={this.state.startDate} onChange={this.startDateHandler} name="startDate" />
                            </div>
                            <br />
                            <div style={{ width: '40%' }} class="form-group">
                                End Date: <DatePicker required selected={this.state.endDate} onChange={this.endDateHandler} name="endDate" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Work Description<input type="text" onChange={this.onChangeHandler} class="form-control" name="workDesc" value={this.state.workDesc} placeholder="Enter work description" />
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
                            <div class="style__card-item___B1f7m style__large___Kv76x">
                                <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr"> Work & Volunteer Experience</h2>
                            </div>
                            <div class="style__card-item___B1f7m style__large___Kv76x">
                                <div class="style__clickable-div___pNXOk">
                                    <div class="style__flex___fCvpa">
                                        <div class="style__media-body___1QdtR">
                                            <div class="style__flex___fCvpa style__justify-space-between___F3m5J">
                                                <div class="style__flex-item___2eWZ4">
                                                    <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr">
                                                        Company Name:  {this.state.companyName}
                                                    </h2>
                                                    <div class="style__text___2ilXR style__large___3qwwG style__fitted___1GslH">
                                                        Job Title:   {this.state.jobTitle}
                                                    </div>
                                                </div>
                                                <div class="style__flex-item___2eWZ4"></div>
                                            </div>
                                            <p class="student-profile-card__content-tertiary-title student-profile-card__content-has-date">
                                                <span>
                                                    Duration: {this.state.startDate.getUTCFullYear()} - {this.state.endDate.getUTCFullYear()}
                                                </span>
                                                <br />
                                                <span>
                                                    Location:  {this.state.city}

                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
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
    console.log("my id is:", state.loginInfo.id)
    return {
        id_student: state.loginInfo.id,
        userType: state.loginInfo.userType
    }
}

export default connect(mapStateToProps, null)(ExperienceDetails);