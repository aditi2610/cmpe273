import React, { Component } from 'react';
import axios from 'axios';
import './../../css/educationDetails.css';
import { connect } from "react-redux";
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

class StudentEducationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeName: '',
            degree: '',
            major: '',
            yop: '',
            cgpa: '',
            id_student: props.id_student,
            userType: props.userType,
            hideButton: false,
            edit: false
        };
        this.yopHandler = this.yopHandler.bind(this);
        this.cgpaHandler = this.cgpaHandler.bind(this);
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
        this.loadData()
    }

    loadData() {

        const urlId = getQueryVariable("id")
        console.log("EducationDetails -> loadData -> requested profile id (from url): ", urlId);

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
        axios.post(`${Constants.BACKEND_URL}/studentEducation/getEducationDetails`, student_payload)
            .then(response => {
                if (response.data) {
                    this.setState({
                        collegeName: response.data.college_name,
                        degree: response.data.degree,
                        major: response.data.major,
                        yop: response.data.yop,
                        cgpa: response.data.cgpa,
                        edit: false
                    })
                }

            })
            .catch(error => {
                console.log("Error in student basic details ", error);
            })
    }

    yopHandler = (e) => {
        this.setState({
            yop: e.target.value
        })
    }
    cgpaHandler = (e) => {
        this.setState({
            cgpa: e.target.value
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
            id: this.state.id_student,
            collegeName: this.state.collegeName,
            degree: this.state.degree,
            major: this.state.major,
            yop: this.state.yop,
            cgpa: this.state.cgpa
        };

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${Constants.BACKEND_URL}/studentEducation/saveEducationDetails`, studentObject)
            .then(response => {
                //console.log("Status Code : ", response.status);

            });
        this.setState({
            edit: false
        })



    }
    render() {
        if (this.state.edit) {
            return (
                <div>
                    <h1> Enter Education Details </h1>
                    <br />
                    <div class="container">
                        <form onSubmit={this.onSubmit} method="post">
                            <div style={{ width: '30%' }} class="form-group">
                                University Name: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="collegeName" value={this.state.collegeName} placeholder="Enter College Name" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Highest Degree: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="degree" value={this.state.degree} placeholder="Enter Highest Degree" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Major: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="major" value={this.state.major} placeholder="Enter Major" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Year of Passing: <input type="number" required onChange={this.yopHandler} class="form-control" name="country" value={this.state.yop} placeholder="Enter year of passing" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                CGPA<input type="number" required onChange={this.cgpaHandler} class="form-control" name="cgpa" value={this.state.cgpa} placeholder="Enter current CGPA" />
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
                    <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr"> Education </h2>
                    <br />
                    <div class="container">
                        <form onSubmit={this.onSubmit} method="post">
                            <div class="style__flex___fCvpa style__justify-space-between___F3m5J">
                                <div class="style__flex-item___2eWZ4">
                                    <div class="style__heading-group___3uRpr">
                                        <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr">
                                            University Name:  {this.state.collegeName}
                                        </h2>
                                        Degree: <div class="style__text___2ilXR style__large___3qwwG">{this.state.degree}</div>
                                    </div>
                                </div>
                                <div class="style__flex-item___2eWZ4">
                                    <div class="style__edit-action___3rbYd">
                                        <svg aria-hidden="true" data-prefix="far" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16 icon" role="img" viewBox="0 0 512 512"></svg>
                                    </div>
                                </div>
                            </div>
                            <section class="student-education__details">
                                <span class="student-profile-card__content-tertiary-title">
                                    Year of Passing<div class="style__text___2ilXR style__small___1Nyai style__fitted___1GslH"> {this.state.yop}</div>
                                </span>
                                <div>
                                    <span class="student-profile-card__details-label">Major in: </span>
                                    {this.state.major}
                                </div>
                                <div>
                                    <span class="student-education__gpa">
                                        <span class="student-profile-card__details-label">Cumulative GPA:</span>
                                        <span class="fullstory-hidden"> {this.state.cgpa}</span>
                                    </span>
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
    //console.log("my id is:", state.loginInfo.id)
    return {
        id_student: state.loginInfo.id,
        userType: state.loginInfo.userType
    }
}

export default connect(mapStateToProps, null)(StudentEducationDetails);



