import React from 'react';
import '../../css/jobListCompany.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { getCompanyJobDetails } from "../../js/actions/index";
import { Redirect } from 'react-router';
import Constants from '../../index';

class CompanyJobListView extends React.Component {
    constructor(props) {
        console.log("Inside CompanyJobListView constructor -> props: ", props);
        super(props);
        this.state = {
            list: [],
            id_company: props.id_company,
            userType: props.userType,
            redirect: false,
            counter: 0
        };
        console.log("Exiting CompanyJobListView constructor -> this.state: ", this.state);
    }

    componentDidMount() {
        if (!this.state.id_company) {
            console.log("CompanyJobListView -> loadData -> Skipped, id_company is not found!");
            return
        }

        console.log("CompanyJobListView -> loadData");
        var company_payload = {
            id: this.state.id_company
        }
        axios.defaults.withCredentials = true;
        axios.post(`${Constants.BACKEND_URL}/jobs/getCompanyJobs`, company_payload)
            .then(response => {
                //console.log("Inside CompanyJobListView componentMount", response.data);
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
            id: item.job_id,
            title: item.job_title,
            description: item.job_description,
            category: item.job_category,
            postingDate: item.posting_date,
            deadline: item.application_deadline,
            city: item.city,
            state: item.state,
            country: item.country,
            salary: item.salary
        }
        this.props.getCompanyJobDetails(payload);
        this.setRedirect();
    }

    setRedirect = () => {
        console.log("CompanyJobListView -> setRedirect");
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            console.log("CompanyJobListView -> renderRedirect");
            return <Redirect to='/jobs/jobDetail' />
        }
    }

    render() {
        console.log("CompanyJobListView -> render");
        return (
            < React.Fragment >
                {this.renderRedirect()}
                <div className="list-group" >
                    {this.state.list.map(listItem => (
                        <li className="list-group-item list-group-item-primary">
                            {/* <div class="contact"> */}
                            <h2>{listItem.job_title}</h2>
                            <div> {listItem.job_description}</div>
                            <div>{listItem.job_category}</div>
                            <Button variant="success" id={listItem.job_id} onClick={this.handleClick(listItem)}>Details</Button>
                            {/* </div> */}
                        </li>
                    ))}
                </div>
            </React.Fragment >
        )
    }
}


const mapStateToProps = state => {
    console.log("CompanyJobListView -> mapStateToProps, state: ", state);
    return {
        id_company: state.loginInfo.id,
        userType: state.loginInfo.userType,
    }
}

const mapDispatchToProps = dispatch => {
    console.log("CompanyJobListView -> mapDispatchToProps,");
    return {
        getCompanyJobDetails: companyJob => dispatch(getCompanyJobDetails(companyJob))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyJobListView);
