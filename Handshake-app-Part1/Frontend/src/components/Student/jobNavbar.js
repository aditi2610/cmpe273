import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

import './../../css/navbar.css';

class JobNavbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render() {
        //if Cookie is set render Logout Button

        let redirectVar = null;
        if (cookie.load('cookie')) {

        }
        return (
            <div>
                {redirectVar}
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">Job Search</a>
                        </div>
                        <ul class="nav navbar-nav">
                            <li class="active"><Link to="/student/job/searchJobs">JobSearch</Link></li>
                            <li><Link to="/student/displayJobs">Applications</Link></li>
                            <li><Link to="/events">Employers</Link></li>
                            <li><Link to="/events">OnCampusInterviews</Link></li>
                        </ul>

                    </div>
                </nav>
            </div>
        )
    }
}

export default JobNavbar;