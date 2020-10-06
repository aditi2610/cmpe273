import React from 'react';
import '../../css/profile.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { getCompanyJobDetails } from "../../js/actions/index";
import { Redirect } from 'react-router';
import Constants from '../../index';

class DisplayJobs extends React.Component {
    constructor(props) {
        console.log("Inside DisplayJobs constructor -> props: ", props);
        super(props);
        this.state = {
            list: [],
            fullTime: false,
            partTime: false,
            internship: false,
            onCampus: false,
            redirect: false,
            query: "",
            city: "",
        };
        console.log("Exiting CompanyJobListView constructor -> this.state: ", this.state);
    }



    // componentWillReceiveProps(newProps) {
    //     console.log("componentWillReceiveProps -> my new props", newProps);
    //     this.setState({
    //         id_company: newProps.id_company,
    //         userType: newProps.userType
    //     },
    //         this.loadData)
    // }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.post(`${Constants.BACKEND_URL}/jobs/getAllJobs`)
            .then(response => {

                var jobList = []
                for (var i = 0; i < response.data.length; i++) {
                    console.log("Response from :", response.data[i]);
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

    onTypeHandlerSearch = (e) => {
        e.preventDefault();
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        }, this.loadSearchResult());
    }

    onChangeHandler = (e) => {
        e.preventDefault();
        if (e.detail === 0) {
            console.log("onChangeHandler -> Enter Key?");
            return
        }

        const value = e.target.value;
        console.log("onChangeHandler -> received callback value: ", value);

        switch (value) {
            case "1":
                console.log("onChangeHandler -> Toggling fullTime")
                this.setState({ fullTime: !this.state.fullTime }, this.loadSearchResult());
                break;
            case "2":
                console.log("onChangeHandler -> Toggling partTime")
                this.setState({ partTime: !this.state.partTime }, this.loadSearchResult());
                break;
            case "3":
                console.log("onChangeHandler -> Toggling internship")
                this.setState({ internship: !this.state.internship }, this.loadSearchResult());
                break;
            case "4":
                console.log("onChangeHandler -> Toggling onCampus")
                this.setState({ onCampus: !this.state.onCampus }, this.loadSearchResult());
                break;
            default:
                console.log("onChangeHandler -> default called");
        }
    }

    loadSearchResult() {
        console.log("loadSearchResult -> props: ", this.state);

        var payload = {
            job_category: [],
            job_title: "",
            city: "",
        };

        var category_list = []
        // collect ft/pt/intern/oncomp status
        if (this.state.fullTime) {
            category_list.push("FULL_TIME");
        }
        if (this.state.partTime) {
            category_list.push("PART_TIME");
        }
        if (this.state.internship) {
            category_list.push("INTERN");
        }
        if (this.state.onCampus) {
            category_list.push("ON_CAMPUS");
        }

        if (category_list.length !== 0) {
            payload.job_category = category_list;
        }

        // string from search
        if (this.state.query.length !== 0) {
            payload["job_title"] = this.state.query;
        }

        // string from city
        if (this.state.city.length !== 0) {
            payload["city"] = this.state.city;
        }

        console.log("loadSearchResult -> payload: ", payload);

        // make api call
        this.fetchData(payload);
    }

    fetchData(payload) {
        console.log("fetchData -> payload: ", payload);
        axios.defaults.withCredentials = true;
        axios.post(`${Constants.BACKEND_URL}/jobs/searchJobs`, payload)
            .then(response => {
                var jobList = []
                for (var i = 0; i < response.data.length; i++) {
                    console.log("fetchData -> Response from backend: ", response.data[i]);
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
            <div class="container">
                {this.renderRedirect()}
                <div class="style__container___15r1p style__large___3HKaH">
                    <form>
                        <div>
                            <div>
                                <div class="style__card___1rhof style__fitted___5wNfd">
                                    <div class="style__card-item___B1f7m style__medium___2atZe">
                                        <div class="style__input-fields___3mtFs">
                                            <div class="style__input-field___2VT8r">
                                                <div class="style__form-field___3lYyO">
                                                    <div class="style__form-group-spacing___3cZ0u style__fitted___3UWcg form-group">
                                                        <input name="query" value={this.state.query} onChange={this.onTypeHandlerSearch} placeholder="Job titles, employers, or keywords" type="text" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="style__space___2f7gG"></div>
                                            <div class="style__input-field___2VT8r">
                                                <div class="style__location___2OaJL form-group">
                                                    <div class="style__places-container___Nhmil">
                                                        <input name="city" value={this.state.city} onChange={this.onTypeHandlerSearch} placeholder="City, State, Zip Code, or Address" class="form-control mapbox-autocomplete-container" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="style__filters___28PUq">
                                            <div class="style__custom-flex___1Wi9I">
                                                <div class="style__pills___2JqQ3">
                                                    <div>
                                                        <button name="fullTime" onClick={this.onChangeHandler} value={1} class="style__pill___3uHDM style__small___1oG3P style__blue___mBOsr style__inverse___2z_Ei style__clickable___3a6Y8" >Full-Time Job</button>
                                                        <button name="partTime" onClick={this.onChangeHandler} value={2} class="style__pill___3uHDM style__small___1oG3P style__blue___mBOsr style__inverse___2z_Ei style__clickable___3a6Y8">Part-Time Job</button>
                                                        <button name="internship" onClick={this.onChangeHandler} value={3} class="style__pill___3uHDM style__small___1oG3P style__blue___mBOsr style__inverse___2z_Ei style__clickable___3a6Y8">Internship</button>
                                                        <button name="onCampus" onClick={this.onChangeHandler} value={4} class="style__pill___3uHDM style__small___1oG3P style__blue___mBOsr style__inverse___2z_Ei style__clickable___3a6Y8">On-Campus Job</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="style__container___1Ln6C">
                            <div class="style__full-height___DHs_Q style__card___1rhof style__fitted___5wNfd">
                                <div class="style__split-view___YNCfu">
                                    <div class="style__results___2OFr9">

                                        <div class="style__jobs___3seWY lazyload-scroll-container">
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
                                    </div>
                                    <div class="job-preview style__details___3tUIf">

                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    console.log("CompanyJobListView -> mapDispatchToProps,");
    return {
        getCompanyJobDetails: companyJob => dispatch(getCompanyJobDetails(companyJob))
    };
}

export default connect(null, mapDispatchToProps)(DisplayJobs);


