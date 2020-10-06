import React from 'react';
import '../../css/searchEvents.css';
import '../../css/application.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { getCompanyEventDetails } from "../../js/actions/index";
import Constants from '../../index';

class SearchStudent extends React.Component {
    constructor(props) {
        console.log("Inside SearchStudent constructor -> props: ", props);
        super(props);
        this.state = {
            list: [],
            redirect: false,
            name: "",
            school: "",
            major: "",
            redirectToId: null,
            skill: "",
        };
        console.log("Exiting SearchStudent constructor -> this.state: ", this.state);
    }

    componentDidMount() {
        console.log("SearchStudent => inside Component Did Mount ")
        axios.defaults.withCredentials = true;
        var payload = {
            student_name: "",
            student_school: "",
            student_major: "",
        };
        axios.post(`${Constants.BACKEND_URL}/student/searchStudents`, payload)
            .then(response => {

                var studentList = []
                for (var i = 0; i < response.data.length; i++) {
                    console.log("Response from :", response.data[i]);
                    studentList.push(response.data[i]);
                }
                this.setState({
                    list: studentList
                });

            })
            .catch(error => {
                console.log("Error in SearchStudent ", error);
            })
    }

    // componentDidUpdate() {
    //     console.log("SearchStudent  => componentDid Update")
    // }

    onTypeHandlerSearch = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log("SearchStudent => onTypeHandlerSearch ", value);
        this.setState({
            ...this.state,
            [e.target.name]: value
        }, this.loadSearchResult());
    }

    loadSearchResult() {
        console.log("SearchStudent loadSearchResult -> props: ", this.state);

        var payload = {
            student_name: "",
            student_school: "",
            student_major: "",
            student_skill: "",
        };

        // string from search
        if (this.state.name.length !== 0) {
            payload["student_name"] = this.state.name;
        }
        if (this.state.school.length !== 0) {
            payload["student_school"] = this.state.school;
        }
        if (this.state.major.length !== 0) {
            payload["student_major"] = this.state.major;
        }
        if (this.state.skill.length !== 0) {
            payload["student_skill"] = this.state.skill;
        }

        this.fetchData(payload);
    }

    fetchData(payload) {
        console.log("fetchData -> payload: ", payload);
        axios.defaults.withCredentials = true;
        axios.post(`${Constants.BACKEND_URL}/student/searchStudents`, payload)
            .then(response => {
                var studentList = []
                for (var i = 0; i < response.data.length; i++) {
                    console.log("SearchStudent => fetchData -> Response from backend: ", response.data[i]);
                    studentList.push(response.data[i]);
                }
                this.setState({
                    list: studentList
                });

            })
            .catch(error => {
                console.log("SearchStudent => Error in SearchStudent ", error);
            })
    }

    setRedirect = (toId) => {
        this.setState({
            redirect: true,
            redirectToId: toId,
        })
    }
    renderRedirect = () => {
        console.log("SearchStudent => redirecting to student page now.. ")
        if (this.state.redirect) {
            return <Redirect to={"/profile?id=" + this.state.redirectToId} />
        }
    }

    handleClick = item => event => {
        console.log("SearchStudent => handleClick", item)
        var payload = {
            id: item.id_student,
            readOnly: true
        }
        console.log("SearchStudent => payload before ", payload)
        localStorage.setItem('STUDENT_PROFILE', JSON.stringify(payload));
        this.setRedirect(item.id_student);
    }

    render() {
        console.log("SearchStudent -> render");
        return (
            <div class="container">
                <div> {this.renderRedirect()}</div>
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
                                        Name
                                </h5>
                                </div>
                                <div class="style__collapsible___24AwF">
                                    <div class="style__content___2p6A4">
                                        <div class="style__form-field___3lYyO">
                                            <div class="style__form-group___2d2Zf style__form-group-spacing___3cZ0u form-group">
                                                <input name="name" placeholder="Enter name" value={this.state.name} onChange={this.onTypeHandlerSearch} type="text" class="form-control" />
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div class="style__divider___1j_Fp style__fitted___38oCJ"></div>
                                <div class="style__heading-container___3Jbq5">
                                    <h5 class="style__heading___2sayp style__heading___29i1Z style__tiny___3MMU7 style__fitted___3L0Tr">
                                        Schools
                                </h5>
                                </div>
                                <div class="style__collapsible___24AwF">
                                    <div class="style__content___2p6A4">
                                        <div class="style__form-field___3lYyO">
                                            <div class="style__form-group___2d2Zf style__form-group-spacing___3cZ0u form-group">
                                                <input name="school" placeholder="Enter School" value={this.state.school} onChange={this.onTypeHandlerSearch} type="text" class="form-control" />
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div class="style__divider___1j_Fp style__fitted___38oCJ"></div>
                                <div class="style__heading-container___3Jbq5">
                                    <h5 class="style__heading___2sayp style__heading___29i1Z style__tiny___3MMU7 style__fitted___3L0Tr">
                                        Major
                                </h5>
                                </div>
                                <div class="style__collapsible___24AwF">
                                    <div class="style__content___2p6A4">
                                        <div class="style__form-field___3lYyO">
                                            <div class="style__form-group___2d2Zf style__form-group-spacing___3cZ0u form-group">
                                                <input name="major" placeholder="Enter Major" value={this.state.major} onChange={this.onTypeHandlerSearch} type="text" class="form-control" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="style__divider___1j_Fp style__fitted___38oCJ"></div>
                                <div class="style__heading-container___3Jbq5">
                                    <h5 class="style__heading___2sayp style__heading___29i1Z style__tiny___3MMU7 style__fitted___3L0Tr">
                                        Skill
                                </h5>
                                </div>
                                <div class="style__collapsible___24AwF">
                                    <div class="style__content___2p6A4">
                                        <div class="style__form-field___3lYyO">
                                            <div class="style__form-group___2d2Zf style__form-group-spacing___3cZ0u form-group">
                                                <input name="skill" placeholder="Enter Skill" value={this.state.skill} onChange={this.onTypeHandlerSearch} type="text" class="form-control" />
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
                                                    <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr"> {listItem.first_name}</h2>
                                                    <div>
                                                        <h4 class="style__heading___29i1Z style__small___2tODs style__fitted___3L0Tr">
                                                            <div>
                                                                {listItem.college_name}
                                                            </div>
                                                        </h4>
                                                        <div class="style__detail-group___3cm6M">
                                                            <div class="style__text___2ilXR style__tight___RF4uH style__muted___2z7cM">
                                                                <span>{listItem.major} </span>
                                                                {listItem.yop}
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
                                                                {listItem.degree}
                                                            </span>
                                                        </span>

                                                    </div>
                                                    <Button variant="success" id={listItem.id_student} onClick={this.handleClick(listItem)}>Details</Button>
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

export default connect(null, mapDispatchToProps)(SearchStudent);


