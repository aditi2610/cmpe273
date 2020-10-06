import React from 'react';
import '../../css/searchEvents.css';
import '../../css/application.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";

import { Redirect } from 'react-router';
import { getCompanyEventDetails } from "../../js/actions/index";
import Constants from '../../index';

class SearchEvents extends React.Component {
    constructor(props) {
        console.log("Inside SearchEvents constructor -> props: ", props);
        super(props);
        this.state = {
            list: [],
            redirect: false,
            query: "",
            event_name: '',
            event_description: '',
            city: "",
        };
        console.log("Exiting SearchEvents constructor -> this.state: ", this.state);
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.post(`${Constants.BACKEND_URL}/events/getAllEvents`)
            .then(response => {
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

    onTypeHandlerSearch = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log("SearchEvents => onTypeHandlerSearch ", value);
        this.setState({
            ...this.state,
            [e.target.name]: value
        }, this.loadSearchResult());
    }

    loadSearchResult() {
        console.log("loadSearchResult -> props: ", this.state);

        var payload = {
            eventName: ""
        };
        // string from search
        if (this.state.query.length !== 0) {
            payload["eventName"] = this.state.query;
        }
        this.fetchData(payload);
    }

    fetchData(payload) {
        console.log("fetchData -> payload: ", payload);
        axios.defaults.withCredentials = true;
        axios.post(`${Constants.BACKEND_URL}/events/searchEvents`, payload)
            .then(response => {
                var eventList = []
                for (var i = 0; i < response.data.length; i++) {
                    console.log("fetchData -> Response from backend: ", response.data[i]);
                    eventList.push(response.data[i]);
                }
                this.setState({
                    list: eventList
                });

            })
            .catch(error => {
                console.log("Error in company job details ", error);
            })
    }




    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        console.log("SearchEvents => redirecting to eventDetail page now.. ")
        if (this.state.redirect) {
            return <Redirect to='/events/eventDetail' />
        }
    }

    handleClick = item => event => {
        console.log("SearchEvent => handleClick", item)
        var payload = {
            id: item.event_id,
            name: item.event_name,
            description: item.event_description,
            eligibility: item.event_eligibility,
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
        console.log("CompanyJobListView -> render");
        return (
            <div class="container">
                {this.renderRedirect()}
                <form>
                    <div class="style__row___273Yw">
                        <div class="style__col___3BbK4 style__col-md-3___cGaLE style__order-md-last___285iU">
                            <div class="style__search-filter-form___9_o0a style__card___1rhof">
                                <div class="style__card-item___B1f7m style__medium___2atZe">
                                    <div class="style__flex___fCvpa style__align-center___GzLZc">
                                        <div class="style__flex-item___2eWZ4">
                                            <h3 class="style__heading___29i1Z style__medium___m_Ip7 style__fitted___3L0Tr">Filters </h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="style__divider___1j_Fp style__fitted___38oCJ"></div>
                                <div class="style__heading-container___3Jbq5">
                                    <h5 class="style__heading___2sayp style__heading___29i1Z style__tiny___3MMU7 style__fitted___3L0Tr">
                                        Search
                                </h5>
                                </div>
                                <div class="style__collapsible___24AwF">
                                    <div class="style__content___2p6A4">
                                        <div class="style__form-field___3lYyO">
                                            <div class="style__form-group___2d2Zf style__form-group-spacing___3cZ0u form-group">
                                                <input name="query" placeholder="Enter a keyword" value={this.state.query} onChange={this.onTypeHandlerSearch} type="text" class="form-control" />
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div class="style__divider___1j_Fp style__fitted___38oCJ"></div>
                                <div class="style__heading-container___3Jbq5">
                                    <h5 class="style__heading___2sayp style__heading___29i1Z style__tiny___3MMU7 style__fitted___3L0Tr">Type</h5>
                                </div>
                                <div class="style__collapsible___24AwF">
                                    <div class="style__content___2p6A4">
                                        <div class="Select autosuggest-facet-event_types is-searchable Select--single">
                                            <div class="Select-control">
                                                <div class="Select-multi-value-wrapper">
                                                    {/* <div class="Select-placeholder">Add Type</div> */}
                                                    <div class="Select-input autosuggest-facet-event_types">
                                                        <input placeholder="Add Type" >
                                                        </input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="style__col___3BbK4 style__col-md-9___1ABht style__order-md-first___15i2B">
                            {this.state.list.map(listItem => (
                                <div>

                                    <div class="style__card___3GuzG style__card___1rhof">
                                        <div class="style__card-item___B1f7m style__medium___2atZe">
                                            <div class="style__layout-container___1SRtj">
                                                <div class="style__overview___cuSaW">
                                                    <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr"> {listItem.event_name}</h2>
                                                    <div>
                                                        <h4 class="style__heading___29i1Z style__small___2tODs style__fitted___3L0Tr">
                                                            <div>
                                                                Company Name
                                                            </div>
                                                        </h4>
                                                        <div class="style__detail-group___3cm6M">
                                                            <div class="style__text___2ilXR style__tight___RF4uH style__muted___2z7cM">
                                                                <span>{listItem.event_date} </span>
                                                            </div>
                                                            <div class="style__text___2ilXR style__tight___RF4uH style__muted___2z7cM style__ellipsis___FZBQZ">
                                                                {/* <link>www.google.com</link> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="style__card-item___B1f7m style__medium___2atZe">
                                            <div class="style__body___1kLCt">
                                                <div class="style__text___2ilXR style__tight___RF4uH">
                                                    <div>
                                                        <span>
                                                            <span>
                                                                {listItem.event_description}
                                                            </span>
                                                        </span>

                                                    </div>
                                                    <Button variant="success" id={listItem.event_id} onClick={this.handleClick(listItem)}>Details</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div >
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        getCompanyEventDetails: companyEvent => dispatch(getCompanyEventDetails(companyEvent))
    };
}

export default connect(null, mapDispatchToProps)(SearchEvents);


