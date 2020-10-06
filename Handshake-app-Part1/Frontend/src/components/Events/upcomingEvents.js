import React from 'react';
// import '../../css/profile.css';
import '../../css/application.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { getCompanyEventDetails } from "../../js/actions/index";
import { Link } from 'react-router-dom';
import Constants from '../../index';

class UpComingEvents extends React.Component {
    constructor(props) {
        console.log("Inside UpComingEvents constructor -> props: ", props);
        super(props);
        this.state = {
            list: [],
            redirect: false
        };
        console.log("Exiting UpComingEvents constructor -> this.state: ", this.state);
    }

    componentDidMount() {

        axios.defaults.withCredentials = true;
        console.log("Inside Component Did mount of UpComingEvents");
        axios.post(`${Constants.BACKEND_URL}/events/getAllEvents`)
            .then(response => {
                console.log("UpComingEvents => component Did Mount has got response")
                var eventList = []
                for (var i = 0; i < response.data.length; i++) {
                    console.log("Response from :", response.data[i]);
                    eventList.push(response.data[i]);
                }
                this.setState({
                    list: eventList
                });

            })
            .catch(error => {
                console.log("Error in company event details ", error);
            })
    }



    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        console.log("UpComingEvents =>  redirecting to eventDetail page now.. ")
        if (this.state.redirect) {
            return <Redirect to='/events/eventDetail' />
        }
    }

    handleClick = item => event => {
        console.log("UpComingEvents => Handle Click has this event: ", item);
        var payload = {
            id: item.event_id,
            name: item.event_name,
            description: item.event_description,
            eligibility: item.eligibility,
            date: item.event_date,
            time: item.event_time,
            city: item.city,
            state: item.state,
            country: item.country
        }
        this.props.getCompanyEventDetails(payload);
        this.setRedirect();

    }

    render() {
        console.log("UpComingEvents -> render");
        return (
            <div class="container">
                {this.renderRedirect()}
                <div class="events-dashboard-container clearfix">
                    <div class="row">
                        <div class="col-md-8 col-md-pull-4">
                            <div class="card-container">
                                <div class="card events__search-card">
                                    <a class="btn btn-brand-primary-inverted">
                                        <Link to="/student/event/searchEvents">Search Events</Link>
                                    </a>
                                    <a class="btn btn-brand-primary-inverted">
                                        <i class="fa fa-search"></i>Find Career Fairs
                                    </a>
                                    <a class="btn btn-brand-primary-inverted">
                                        <i class="fa fa-search"></i>Request Appointments
                                    </a>
                                    <a class="btn btn-brand-primary-inverted">
                                        <i class="fa fa-search"></i>Explore Jobs
                                    </a>

                                </div>

                            </div>
                            <h2 class="event-category">Events Today</h2>
                            <div class="card-container">
                                <div class="card card-events-dashboard">
                                    <div class="card-heading">
                                        <div class="card-heading-title-container">
                                            {this.state.list.map(listItem => (
                                                <div class="row">
                                                    <div class="col-sm-7">
                                                        <h3 class="card-heading-title">{listItem.event_name}</h3>
                                                        <h4 class="card-heading-subtitle">{listItem.event_date}</h4>
                                                    </div>
                                                    <div class="col-sm-5 details-container">
                                                        <Button class="btn btn-brand-alt-green btn-xs inverted btn-event" id={listItem.event_id} onClick={this.handleClick(listItem)} > View Event</Button>
                                                        <div class="event-attribute"> 240 Students registered</div>
                                                        <div class="event-attribute"> Virtual Session</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        getCompanyEventDetails: companyEvent => dispatch(getCompanyEventDetails(companyEvent))
    };
}

export default connect(null, mapDispatchToProps)(UpComingEvents);


