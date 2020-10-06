import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Constants from '../../index';

class EventDetail extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Event Details Constructor", props);
        this.state = {

            id: props.id,
            name: props.name,
            description: props.description,
            eligibility: props.eligibility,
            date: props.date,
            time: props.time,
            city: props.city,
            state: props.state,
            country: props.country,
            list: [],
            userType: props.userType,
            hideButton: true,
            id_student: props.id_student,
            redirect: false,
            redirectToId: null,
            student_degree: ''
        }
    }


    componentDidMount() {
        const data = {
            id: this.state.id
        }

        axios.defaults.withCredentials = true;
        console.log("Inside Component Did Mount", data);
        axios.post(`${Constants.BACKEND_URL}/events/getStudents`, data)
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

    setRedirect = (toId) => {
        this.setState({
            redirect: true,
            redirectToId: toId,
        })
    }
    renderRedirect = () => {
        console.log("eventDetails => redirecting to student page now.. ")
        if (this.state.redirect) {
            return <Redirect to={"/profile?id=" + this.state.redirectToId} />
        }
    }

    handleClick = item => event => {
        console.log("eventDetails => handleClick", item)
        var payload = {
            id: item.id_student,
            readOnly: true
        }
        console.log("eventDetails => payload before ", payload)
        this.setRedirect(item.id_student);
    }

    onClickRegisterHandler = (e) => {
        console.log(" EventDetails => onClickRegisterHandler . User has clicked the button");
        var data = {
            student_id: this.state.id_student,
            event_id: this.state.id
        }

        var student_payload = {
            id: this.state.id_student
        }
        //getStudentDegree
        axios.post(`${Constants.BACKEND_URL}/studentEducation/getEducationDetails`, student_payload)
            .then(response => {
                if (response.data) {
                    this.setState({
                        student_degree: response.data.degree,
                    })
                }

            })
            .catch(error => {
                console.log("Error in student basic details ", error);
            })

        if (this.state.eligibility === "all" || this.state.eligibility === this.state.student_degree) {
            console.log("Eligibilty has mateched, now inserting values in DB");
            axios.post(`${Constants.BACKEND_URL}/events/registerForEvents`, data)
                .then(response => {
                    console.log("Inside onClickRegisterHandler", response.data);
                    alert("User has successfully registered for the event");

                })
                .catch(error => {
                    console.log("Error in registering for Event ", error);
                })
        } else {
            alert("User is not eligible for This event");
        }

    }

    render() {
        console.log("Inside render ", this.state)
        return (
            <div>
                <div class="container">
                    <div> {this.renderRedirect()}</div>
                    <h1> Event details</h1>
                    <div>
                        {this.state.id}
                    </div>
                    <br />
                    <div>
                        {this.state.name}
                        <br />
                        {this.state.description}
                        <br />
                        {this.state.eligibility}
                        <br />
                        {this.state.date}
                        <br />
                        {this.state.time}
                        <br />
                        {this.state.city}
                        <br />
                        {this.state.state}
                        <br />
                        {this.state.country}
                        <br />
                        <div style={{ width: '30%' }}>
                            {this.state.hideButton ? null : <button onClick={this.onClickRegisterHandler} class="btn btn-success" type="button">Register</button>}
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
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    //return  {username: state.loginInfo.username}
    console.log("my job details  ", state.companyEvent);
    // console.log("my id inside Jobs: ", state.companyJob.id);
    return {
        id: state.companyEvent.id,
        name: state.companyEvent.name,
        description: state.companyEvent.description,
        eligibility: state.companyEvent.eligibility,
        date: state.companyEvent.date,
        time: state.companyEvent.time,
        city: state.companyEvent.city,
        state: state.companyEvent.state,
        country: state.companyEvent.country,
        userType: state.loginInfo.userType,
        id_student: state.loginInfo.id
    }
}


export default connect(mapStateToProps, null)(EventDetail);

//export default EventDetail;
