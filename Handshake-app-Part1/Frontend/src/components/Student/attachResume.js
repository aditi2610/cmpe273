import React, { Component } from 'react';
import axios from 'axios';
import './../../css/application.css';
import './../../css/chunk.css';
import { connect } from "react-redux";
import Constants from '../../index';
import { Redirect } from 'react-router';

//create the Navbar Component

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}

class AttachResume extends Component {
    constructor(props) {
        super(props);
        this.state = {

            hideButton: false,
            id_student: props.id_student,
            userType: props.userType,
            jobId: '',
            redirect: false,

        };
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.onClickApplyHandler = this.onClickApplyHandler.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log("my new props is_student", newProps.id_student);
        console.log("my new props userType", newProps.userType);
        this.setState({
            id_student: newProps.id_student,
            userType: newProps.userType,
        })
    }

    componentWillMount() {
        const urlId = getQueryVariable("id")
        console.log("AttachResume -> componentWillMount -> requested job id (from url): ", urlId);
        this.setState({
            jobId: urlId
        })

    }

    onClickApplyHandler = (e) => {
        console.log("Attach Resume => User has clicked the button", this.state);
        var data = {
            student_id: this.state.id_student,
            job_id: this.state.jobId
        }
        axios.post(`${Constants.BACKEND_URL}/jobs/applyForJob`, data)
            .then(response => {
                console.log("Inside onClickApplyHandler", response.data);
                // button

            })
            .catch(error => {
                console.log("Error in applying for job ", error);
            })

        this.setRedirect();

    }

    setRedirect = () => {
        console.log("CompanyProfile => Setting redirect");
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        console.log("CompanyProfile => Render Redirect ");
        if (this.state.redirect) {
            return <Redirect to='/profile' />
        }
    }

    handleUploadImage(ev) {
        //supports only png for now!
        console.log("AttachResume => HandleUploadImage")
        ev.preventDefault();
        console.log("AttachResume:", this.state.id_student);
        var fName = this.state.id_student + "_" + ev.target.name + ".png"
        console.log("AttachResume => =>", fName);
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', fName);

        axios.post(`${Constants.BACKEND_URL}/upload`, data)
            .then(function (response) {
                console.log(" AttachResume => response has been received")
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    render() {

        return (
            <div class="container">
                {this.renderRedirect()}
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="style__flex___fCvpa style__justify-space-between___F3m5J">
                            <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr">
                                <span>
                                    Submit Documents on Handshake
                                </span>
                            </h2>
                        </div>
                    </div>
                    <form>
                        <div class="modal-body">
                            <div>
                                <div>
                                    <fieldset class="style__container___1isE7">
                                        <legend class="style__legend___eGN0D">
                                            <h3 class="style__heading___29i1Z style__medium___m_Ip7 style__fitted___3L0Tr">
                                                Attach Your resume
                                            </h3>
                                        </legend>
                                        <div>
                                            <div>
                                                {/* <div class="style__flex___fCvpa style__align-center___GzLZc"> */}<div>
                                                    {/* <div class="style__flex-item___2eWZ4">
                                                        <div class="style__form-field___3lYyO">
                                                            <div class="style__form-field___1hnnF style__form-group-spacing___3cZ0u form-group">
                                                                <div class="Select required-job-document-type-3834553 is-clearable is-searchable Select--single">
                                                                    <div class="Select-control">
                                                                <span class="Select-multi-value-wrapper">
                                                                <div class="Select-placeholder">Search Your Resumes</div>
                                                                <div>
                                                                            <input class="Select-input required-job-document-type-3834553" />
                                                                        </div>
                                                                </span>
                                                                <span class="Select-arrow-zone">
                                                                            <span class="Select-arrow"></span>
                                                                        </span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                    <div class="style__flex-item___2eWZ4">
                                                        <div class="style__flex___fCvpa style__align-center___GzLZc">
                                                            {/* <span class="style__or___BTul7">or</span> */}

                                                            <form name="resume" onSubmit={this.handleUploadImage}>

                                                                <div>
                                                                    <input className="form-control" name="profilePhoto" ref={(ref) => { this.uploadInput = ref; }} type="file" />
                                                                    <br />
                                                                    <button type class="style__base___hEhR9 style__primary___1JMHS">
                                                                        Upload New
                                                                        </button>

                                                                </div>
                                                            </form>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="style__flex___fCvpa style__justify-flex-end___229cl">
                                <span>
                                    <div>
                                        <button onClick={this.onClickApplyHandler} class="style__base___hEhR9 style__success___S1K0N">Submit</button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("my id is:", state.loginInfo.id)
    return {
        id_student: state.loginInfo.id,
        userType: state.loginInfo.userType
    }
}

export default connect(mapStateToProps, null)(AttachResume);