import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';


import StudentBasicDetails from './StudentDetails/StudentBasicDetails';
import Navbar from './LandingPage/Navbar';
import SignUp from './StudentSignUp/StudentSignUp';
import StudentDocument from './StudentDetails/StudentDocuments';
import EducationDetails from './StudentDetails/EducationDetails';
import ExperienceDetails from './StudentDetails/ExperienceDetails';
import Profile from './Profile/Profile';
import StudentContactDetails from './StudentDetails/ContactInfo';
import SkillSet from './StudentDetails/SkillSet';
import CompanySignUp from './CompanySignIn/companySignUp';
import CreateJob from './Jobs/createJobs';
import LandingCompanyHome from './Company/landingPage';
import CompanyJobListView from './Jobs/jobsListCompany';
import CompanyJobDetail from './Jobs/jobDetails';

import CreateEvent from './Events/createEvents';
import CompanyEventList from './Events/eventListCompany';
import CompanyEventDetails from './Events/eventDetails';
import DisplayJobs from './Jobs/displayJobs';
import JobNavbar from './Student/jobNavbar';
import EventNavbar from './Student/eventNavbar';
import searchEvents from './Events/searchEvents';
import upcomingEvents from './Events/upcomingEvents';
import searchStudent from './Student/searchStudent';
import companyProfile from './Company/companyProfile';

import AttachResume from './Student/attachResume';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={Navbar} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path='/profile' component={Profile} />

                <Route path="/studentDocuments" component={StudentDocument} />
                <Route path="/studentBasicDetails" component={StudentBasicDetails} />
                <Route path="/educationDetail" component={EducationDetails} />
                <Route path="/experienceDetail" component={ExperienceDetails} />
                <Route path="/contactDetails" component={StudentContactDetails} />
                <Route path="/skillSet" component={SkillSet} />
                <Route path="/uploadResume" component={AttachResume} />

                <Route path="/student/searchStudent" component={searchStudent} />
                <Route path="/student/job" component={JobNavbar} />
                <Route path="/student/job/searchJobs" component={DisplayJobs} />

                <Route path="/student/event" component={EventNavbar} />
                <Route path="/student/event/upComingEvents" component={upcomingEvents} />
                <Route path="/student/event/searchEvents" component={searchEvents} />


                <Route path="/company/signUp" component={CompanySignUp} />
                <Route path="/company/profile" component={companyProfile} />


                <Route path="/company/landingPage" component={LandingCompanyHome} />

                <Route path="/jobs/createJob" component={CreateJob} />
                <Route path="/jobs/jobList" component={CompanyJobListView} />
                <Route path="/jobs/jobDetail" component={CompanyJobDetail} />


                <Route path="/events/createEvent" component={CreateEvent} />
                <Route path="/events/eventList" component={CompanyEventList} />
                <Route path="/events/eventDetail" component={CompanyEventDetails} />



            </div>
        )
    }
}

export default Main;