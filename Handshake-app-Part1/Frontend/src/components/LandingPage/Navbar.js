import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../css/navbar.css';

//create the Navbar Component
class Navbar extends Component {
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
        let navLogin = null;
        if (cookie.load('cookie')) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if (cookie.load('cookie')) {
            //redirectVar = <Redirect to="/profile"/>
        }
        return (
            <div>
                {redirectVar}
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            {/* <a className="navbar-brand">Handshake</a> */}
                            <a className="navbar-brand">Handshake</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active"><Link to="/profile">Profile</Link></li>
                            <li><Link to="/student/job/searchJobs">Jobs</Link></li>
                            <li><Link to="/student/event/upComingEvents">Events</Link></li>
                            <li><Link to="/student/searchStudent">Students</Link></li>
                        </ul>
                        {navLogin}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;