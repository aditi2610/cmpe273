import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/searchEvents.css';
import '../../css/application.css';



class LandingCompanyHome extends Component {


    render() {

        return (
            <div>
                <br />
                <div class="container">
                    <form method="post">
                        <div class="col-md-4">
                            {/* <a class="btn btn-block btn-lg" > */}
                            <a>
                                <Link to="/jobs/createJob">Create a Job</Link>
                            </a>

                            <div class="panel panel-default dashboard-list">
                                <div class="panel-heading dashboard-header">
                                    <h4>
                                        <i class="hs-jobs" />
                                        <Link to="/jobs/jobList">Job</Link>
                                    </h4>
                                </div>
                                <ul class="list-group no-scroll-fixed-height">
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-4">
                            {/* <a class="btn  btn-block btn-lg" > */}
                            <a>
                                <Link to="/events/createEvent">Create an Event</Link>
                            </a>
                            <div class="panel panel-default dashboard-list">
                                <div class="panel-heading dashboard-header">
                                    <h4>
                                        <i class="hs-jobs" />
                                        <Link to="/events/eventList">Events</Link>
                                    </h4>
                                </div>
                                <ul class="list-group no-scroll-fixed-height">
                                </ul>
                            </div>
                        </div>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}

export default LandingCompanyHome;