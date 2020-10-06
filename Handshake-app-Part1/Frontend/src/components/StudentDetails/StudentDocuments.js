import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import '../../css/application.css';
import './../../css/chunk.css';
import Constants from '../../index';

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) { return pair[1]; }
    }
    return (false);
}

class StudentDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            phoneNumber: '',
            hideButton: false,
            userType: props.userType,
            id_student: props.id_student,
            edit: false,
            resume: null,
        };

        this.emailHandler = this.emailHandler.bind(this);
        this.phoneNumberHandler = this.phoneNumberHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            id_student: newProps.id_student,
            userType: newProps.userType
        },
            this.loadData)
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const urlId = getQueryVariable("id")
        console.log("ContactInfo -> loadData -> requested profile id (from url): ", urlId);

        if (this.state.userType === 'company') {
            this.setState({
                hideButton: true
            })
        }
        var student_payload;

        if (urlId && urlId !== this.state.id_student) {
            this.setState({
                hideButton: true
            })
            student_payload = {
                id: urlId
            }

        }
        else {
            student_payload = {
                id: this.state.id_student
            }
        }

        axios.defaults.withCredentials = true;
        axios.post(`${Constants.BACKEND_URL}/studentContactInfo/getContactDetails`, student_payload)
            .then(response => {

                if (response.data) {
                    this.setState({
                        emailId: response.data.email_id,
                        phoneNumber: response.data.phone_number,
                        edit: false
                    })
                }

            })
            .catch(error => {
                console.log("Error in student Contact Info details ", error);
            })

        student_payload["document_name"] = "resume";
        console.log("loadData -> fetching resume, payload: ", student_payload);
        axios.post(`${Constants.BACKEND_URL}/getDocument`, student_payload, { responseType: 'blob' })
            .then(response => {
                console.log("loadData -> received response!");
                if (response.data) {
                    console.log("loadData -> fetching resume success!");
                    this.setState({
                        resume: new Blob([response.data], { type: 'application/pdf' }),
                    });
                    var fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                    window.open(fileURL);
                }
            })
            .catch(error => {
                console.log("loadData -> fetching resume failed ", error);
            })
    }

    openResumeWindow() {
        var fileURL = window.URL.createObjectURL(this.state.resume);
        window.open(fileURL);
    }

    handleUploadImage(ev) {
        console.log("StudentDocuments => HandleUploadImage", this.uploadInput)
        ev.preventDefault();
        console.log(this.state.id_student)
        var fName = this.state.id_student + "_" + ev.target.name + ".pdf";
        console.log("StudentDocuments =>", fName);
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', fName);

        axios.post(`${Constants.BACKEND_URL}/upload`, data)
            .then(function (response) {
                console.log(" StudentDocuments => response has been received")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    emailHandler = (e) => {
        this.setState({
            emailId: e.target.value
        })
    }

    phoneNumberHandler = (e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    onClickHandler = (e) => {

        if (this.state.edit) {
            this.setState({
                edit: false
            })
        } else {
            this.setState({
                edit: true
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const studentObject = {
            emailId: this.state.emailId,
            phoneNumber: this.state.phoneNumber,
            id: this.state.id_student,
            edit: false
        };

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${Constants.BACKEND_URL}/studentContactInfo/saveContactDetails`, studentObject)
            .then(response => {
                console.log("Status Code : ", response.data);
            });
        this.setState({
            edit: false
        })
    }

    onError(e) {
        console.log(e, 'error in file-viewer');
    }

    render() {
        if (this.state.edit) {
            return (
                <div>
                    <br />
                    <div class="container">

                        <form onSubmit={this.onSubmit} method="post">
                            <div class="style__spacing-lg-bottom___15_21">
                                {/* <div class="style__flex___fCvpa style__align-center___GzLZc style__justify-flex-end___229cl"> */}
                                <div>
                                    <span class="style__muted___3g1Dx">Add more resumes, cover letters, or transcripts</span>
                                    <div class="style__spacing-md-left___3x94N">
                                        <form onSubmit={this.handleUploadImage} name="resume">
                                            <div style={{ width: '30%' }} class="form-group">
                                                Resume
                                                <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
                                            </div>
                                            <button className="btn btn-success" type>Upload</button>
                                        </form>
                                    </div>
                                </div>
                                <div>
                                    <h2 class="style__heading___29i1Z style__large___15W-p">Resumes</h2>
                                    <table class="table manage-table documents-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="clickable">
                                                <td class="style__spaced___1Pzci">
                                                    <button class="text-button"> FileName.pdf</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <h2 class="style__heading___29i1Z style__large___15W-p">Other Documents</h2>
                                    <table class="table manage-table documents-table">
                                        <thead>
                                            <tr>
                                                <th class="document-name"> Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="clickable">
                                                <td class="style__spaced___1Pzci">
                                                    <button class="text-button"> OtherDocument.pdf</button>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </form>

                    </div>
                </div >
            )
        } else {
            return (
                <div>
                    <br />
                    <div class="container">

                        <form onSubmit={this.onSubmit} method="post">
                            <div class="style__card-item___B1f7m style__large___Kv76x">
                                <h2 class="style__heading___29i1Z style__large___15W-p">Documents</h2>
                                <ul class="student-documents__document-list">
                                    <li class="student-documents__document-list">Resume</li>
                                    <li class="student-documents__document">
                                        <a class="student-documents__document-link">

                                            <span class="student-documents__document-name">File Name</span>
                                            {/* {this.state.resume ? <FileViewer
                                                fileType='pdf'
                                                filePath={this.state.resume}
                                                onError={this.onError} /> : null} */}
                                        </a>
                                    </li>
                                </ul>
                                <ul class="student-documents__document-list">
                                    <li class="student-documents__document-list">Other Documents</li>
                                    <li class="student-documents__document">
                                        <a class="student-documents__document-link">

                                            <span class="student-documents__document-name">File Name</span>
                                        </a>
                                    </li>
                                </ul>
                                <div>
                                    <button class="style__base___hEhR9 style__success___S1K0N" onClick={this.onClickHandler}>Manage Documents</button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div >
            )
        }
    }
}

const mapStateToProps = state => {

    return {
        id_student: state.loginInfo.id,
        userType: state.loginInfo.userType
    }
}

export default connect(mapStateToProps, null)(StudentDocument);