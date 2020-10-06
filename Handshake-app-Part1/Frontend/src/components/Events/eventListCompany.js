import React from 'react';
import '../../css/jobListCompany.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { getCompanyEventDetails } from "../../js/actions/index";
import { Redirect } from 'react-router';
import Constants from '../../index';

class CompanyEventListView extends React.Component {
    constructor(props) {
        console.log("Inside Event list constructor");
        super(props);
        this.state = {
            list: [],
            id_company: props.id_company,
            redirect: false
        };

    }

    componentDidMount() {
        var company_payload = {
            id: this.state.id_company
        }
        axios.defaults.withCredentials = true;
        axios.post(`${Constants.BACKEND_URL}/events/getCompanyEvents`, company_payload)
            .then(response => {
                console.log("Inside CompanyEventListView componentMount", response.data);
                var jobList = []
                for (var i = 0; i < response.data.length; i++) {
                    //console.log("Response from :", response.data[i]);
                    jobList.push(response.data[i]);

                }
                this.setState({
                    list: jobList
                });

            })
            .catch(error => {
                console.log("Error in company job details ", error);
            })
    }

    handleClick = item => event => {
        console.log("Handle Click has this event: ", item);
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

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        console.log("CompanyEventListView =>redirecting to eventDetail page now.. ")
        if (this.state.redirect) {
            return <Redirect to='/events/eventDetail' />
        }
    }
    render() {
        console.log("EventListCompany => Inside render")
        return (

            <div class="container">
                {this.renderRedirect()}
                <div className="list-group" >
                    {this.state.list.map(listItem => (
                        <li className="list-group-item list-group-item-primary">
                            <h2>{listItem.event_name}</h2>
                            <div> {listItem.event_description}</div>
                            <div> {listItem.event_date}</div>
                            <div> {listItem.event_time}</div>
                            <Button variant="success" id={listItem.event_id} onClick={this.handleClick(listItem)}>Details</Button>
                            {/* </div> */}
                        </li>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("CompanyJobListView -> mapStateToProps, state: ", state);
    return {
        id_company: state.loginInfo.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCompanyEventDetails: companyEvent => dispatch(getCompanyEventDetails(companyEvent))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyEventListView);
//export default CompanyJobListView;