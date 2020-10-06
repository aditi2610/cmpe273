import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from 'react-router';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import Constants from '../../index';

class Events extends Component {
    //Post Job openings (with job title, posting date, application deadline, location, salary, job description, job category – full time, part time, intern, on campus)

    constructor(props) {
        //console.log("Inside Events constructor", props);
        super(props);
        this.state = {
            eventName: '',
            description: '',
            eventDate: new Date(),
            eventTime: '10:00',
            city: '',
            state: '',
            country: '',
            eligibility: '',
            idCompany: props.idCompany,
            edit: false,
            authFlag: false,
            redirect: false

        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.eventDateHandler = this.eventDateHandler.bind(this);
        this.eventTimeHandler = this.eventTimeHandler.bind(this);
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

    eventDateHandler(date) {
        this.setState({
            eventDate: date
        })
    }

    eventTimeHandler(event, eventTime) {
        this.setState({ eventTime });
    }

    onSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        console.log("Inside Submit of Create Events");
        const eventObject = {
            eventName: this.state.eventName,
            description: this.state.description,
            eventDate: this.state.eventDate,
            eventTime: this.state.eventTime,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            eligibility: this.state.eligibility,
            idCompany: this.state.idCompany,
            error: '',
            authFlag: false
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log("before sending to backend companyObject is :", eventObject);
        axios.post(`${Constants.BACKEND_URL}/events/createEvent`, eventObject)
            .then(response => {
                console.log("Status Code : ", response);
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
            return <Redirect to='/events/eventList' />
        }
    }


    render() {
        const { eventTime } = this.state;
        console.log("Inside render of Events");
        return (
            <div>
                {this.renderRedirect()}
                <div class="container">
                    <form onSubmit={this.onSubmit} method="post">
                        Create Event
                        <div style={{ width: '30%' }} class="form-group">
                            Event Name <input type="text" required onChange={this.onChangeHandler} class="form-control" name="eventName" value={this.state.eventName} placeholder="Enter Event Name" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Description <input type="text" required onChange={this.onChangeHandler} class="form-control" name="description" value={this.state.description} placeholder="Enter Event Description" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Event Date: <DatePicker required selected={this.state.eventDate} onChange={this.eventDateHandler} name="eventDate" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            Event Time: <input required value={eventTime} onChange={this.eventTimeHandler} name="eventTime" />
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
                            Eligibility: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="eligibility" value={this.state.eligibility} placeholder="Enter Eligibility" />
                        </div>
                        <br />
                        <div>
                            {this.state.error}
                        </div>
                        <div style={{ width: '30%' }}>
                            <button class="btn btn-success" type="submit">Create Event</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => {
    //return  {username: state.loginInfo.username}
    console.log("my loginInfo inside Jobs: ", state.loginInfo);
    console.log("my id inside Jobs: ", state.loginInfo.id);
    return { idCompany: state.loginInfo.id }
}


export default connect(mapStateToProps, null)(Events);

//export default Jobs;