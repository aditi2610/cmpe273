import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Constants from '../../index';

class JobDetail extends Component {
    constructor(props) {
        super(props);
        console.log("Inside JobDetails Constructor", props);
        this.state = {
            id: props.id,
            title: props.title,
            description: props.description,
            category: props.category,
            postingDate: props.postingDate,
            deadline: props.deadline,
            city: props.city,
            state: props.state,
            country: props.country,
            salary: props.salary,
            list: [],
            userType: props.userType,
            hideButton: true,
            id_student: props.id_student,
            redirect: false,
            redirectToId: null,
            redirectToResume: false
        }

        this.handleApplicationStatus = this.handleApplicationStatus.bind(this);
    }


    componentDidMount() {
        const data = {
            id: this.state.id
        }


        axios.defaults.withCredentials = true;
        console.log("Inside Component Did Mount", data);
        axios.post(`${Constants.BACKEND_URL}/jobs/getStudents`, data)
            .then(response => {
                console.log("Inside componentDidMount", response.data);
                var studentList = []
                for (var i = 0; i < response.data.length; i++) {
                    console.log("Response from :", response.data[i]);
                    studentList.push(response.data[i]);

                }
                this.setState({
                    list: studentList
                });

            })
            .catch(error => {
                console.log("Error in company job details ", error);
            })

        if (this.state.userType === 'student') {
            console.log("userType is student")
            this.setState({
                hideButton: false
            })
        }
    }

    handleClick = item => event => {
        console.log("Handle Click has this event: ", item);
        var payload = {
            id: item.id_student
        }
        localStorage.setItem('STUDENT_DATA', JSON.stringify(payload));
        this.setRedirect(item.id_student);
    }

    handleApplicationStatus = item => event => {
        console.log(`handleApplicationStatus -> has this event: ${event.target.name}, student: ${item.id_student}`);
        axios.defaults.withCredentials = true;
        console.log("handleApplicationStatus -> Making API call");
        var student_payload = {
            application_status: event.target.name,
            id_student: item.id_student,
            id_job: this.state.id
        }
        console.log("handleApplicationStatus -> API payload: ", student_payload);
        axios.post(`${Constants.BACKEND_URL}/jobs/updateApplicationStatus`, student_payload)
            .then(response => {
                console.log("handleApplicationStatus -> API success!");
            })
            .catch(error => {
                console.log("handleApplicationStatus -> API error ", error);
            })
    }

    onClickApplyHandler = (e) => {
        // console.log("User has clicked the button");
        // var data = {
        //     student_id: this.state.id_student,
        //     job_id: this.state.id
        // }
        // axios.post(`${Constants.BACKEND_URL}/jobs/applyForJob`, data)
        //     .then(response => {
        //         console.log("Inside onClickApplyHandler", response.data);
        //         //TODO Apply for a Job opening by uploading Resume document (PDF) and clicking Submit Application
        //         // button

        //     })
        //     .catch(error => {
        //         console.log("Error in applying for job ", error);
        //     })

        this.uploadResume();

    }

    uploadResume = () => {
        this.setState({
            redirectToResume: true,
            jobId: this.state.id
        })
    }

    setRedirect = (toId) => {
        this.setState({
            redirect: true,
            redirectToId: toId,
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={"/profile?id=" + this.state.redirectToId} />
        }

        if (this.state.redirectToResume) {
            return <Redirect to={"/uploadResume?id=" + this.state.jobId} />
        }
    }

    render() {
        console.log("Inside render ", this.state)
        return (
            <div>

                <div class="container">
                    <div> {this.renderRedirect()}</div>
                    <h1> Job details</h1>
                    <div>
                        {this.state.id}
                    </div>
                    <br />
                    <div>
                        {this.state.title}
                        <br />
                        {this.state.description}
                        <br />
                        {this.state.category}
                        <br />
                        {this.state.deadline}
                        <br />
                        {this.state.salary}
                        <br />
                        {this.state.city}
                        <br />
                        {this.state.state}
                        <br />
                        {this.state.country}
                        <br />
                        <div style={{ width: '30%' }}>
                            {this.state.hideButton ? null : <button onClick={this.onClickApplyHandler} class="btn btn-success" type="button">Apply</button>}
                        </div>
                    </div>
                    <div className="list-group" >
                        {this.state.list.map(listItem => (
                            <li className="list-group-item list-group-item-primary">
                                {/* <div class="contact"> */}
                                <h2>{listItem.first_name}</h2>
                                <h2>{listItem.last_name}</h2>
                                <div> {listItem.email_id}</div>
                                <div>{listItem.phone_number}</div>
                                <Button variant="success" id={listItem.id_student} onClick={this.handleClick(listItem)}>Details</Button>
                                <Button variant="success" name="review" onClick={this.handleApplicationStatus(listItem)}>Reviewed</Button>
                                <Button variant="success" name="decline" onClick={this.handleApplicationStatus(listItem)}>Decline</Button>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("my job details  ", state.companyJob);
    // console.log("my id inside Jobs: ", state.companyJob.id);
    return {
        id: state.companyJob.id,
        title: state.companyJob.title,
        description: state.companyJob.description,
        category: state.companyJob.category,
        postingDate: state.companyJob.postingDate,
        deadline: state.companyJob.deadline,
        city: state.companyJob.city,
        state: state.companyJob.state,
        country: state.companyJob.country,
        salary: state.companyJob.salary,
        userType: state.loginInfo.userType,
        id_student: state.loginInfo.id
    }
}

export default connect(mapStateToProps, null)(JobDetail);
