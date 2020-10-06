import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/application.css';
import '../../css/chunk.css';
import { connect } from "react-redux";
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

class StudentBasicDetails extends Component {
    constructor(props) {
        super(props);
        console.log("props inside constructor", props);
        this.state = {
            dob: new Date(),
            city: '',
            state: '',
            country: '',
            careerObjective: '',
            selectedFile: null,
            hideButton: false,
            id_student: props.id_student,
            userType: props.userType,
            edit: false,
            uploadStatus: false,
            profilePic: null,
            profilePicUrl: null,
        };

        //console.log("state in constructor ", this.state);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.dobHandler = this.dobHandler.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log("my new props is_student", newProps.id_student);
        this.setState({
            id_student: newProps.id_student,
            userType: newProps.userType,
        },
            this.loadData)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        axios.defaults.withCredentials = true;

        const urlId = getQueryVariable("id")
        console.log("StudentBasicDetails -> loadData -> requested profile id (from url): ", urlId);

        if (this.state.userType === 'company') {
            console.log("User type is company")
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

        console.log("Before get BAsic details", student_payload);
        axios.post(`${Constants.BACKEND_URL}/student/getBasicDetails`, student_payload)
            .then(response => {
                console.log("Inside Student basic details componentMount", response.data);
                if (response.data) {
                    this.setState({
                        // dob: new Date(Date.parse(response.data.dateOfBirth)),
                        dob: new Date(),
                        city: response.data.city,
                        state: response.data.state,
                        country: response.data.country,
                        careerObjective: response.data.career_objective,
                        selectedFile: response.data.resume,
                        edit: false
                    })
                    console.log(this.state);
                }

            })
            .catch(error => {
                console.log("Error in student basic details ", error);
            })

        student_payload["document_name"] = "profilePic";
        console.log("loadData -> fetching profilePic, payload: ", student_payload);
        axios.post(`${Constants.BACKEND_URL}/getDocument`, student_payload, { responseType: 'blob' })
            .then(response => {
                console.log("loadData -> received response!");
                if (response.data) {
                    console.log("loadData -> fetching profilePic success!");
                    var fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
                    this.setState({
                        profilePic: new Blob([response.data], { type: 'image/png' }),
                        profilePicUrl: fileURL
                    }, this.profilePicCallback);
                    // window.open(fileURL);
                }
            })
            .catch(error => {
                console.log("loadData -> fetching profilePic failed ", error);
            })
    }

    profilePicCallback() {
        console.log("StudentBasicDetails -> profilePicCallback -> ", this.state);
        this.render();
    }

    onChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });

    }

    dobHandler(date) {
        this.setState({
            dob: date
        })
    }

    onClickHandler = (e) => {
        console.log("Inside onClickHandler");
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

    handleUploadImage(ev) {
        //supports only png for now!
        console.log("StudentBasicDetails => HandleUploadImage")
        ev.preventDefault();
        console.log("Student Basic Details:", this.state.id_student);
        var fName = this.state.id_student + "_" + ev.target.name + ".png"
        console.log("StudentDocuments =>", fName);
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', fName);

        axios.post(`${Constants.BACKEND_URL}/upload`, data)
            .then(function (response) {
                console.log(" StudentBasicDetails => response has been received")
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    onSubmit = (e) => {
        e.preventDefault();
        console.log("inside submit of Login ");
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        const studentObject = {
            dob: this.state.dob,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            careerObjective: this.state.careerObjective,
            id_student: this.state.id_student
        };

        this.setState({
            edit: false
        })
        console.log("before sending data to user", studentObject);
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${Constants.BACKEND_URL}/student/saveBasicDetails`, studentObject)
            .then(response => {
                console.log("Status Code : ", response.status);

            });
    }


    render() {
        if (this.state.edit) {
            return (
                <div>
                    <h1> Enter Basic Details </h1>
                    <br />
                    <div class="container">
                        <img src={this.props.profilePicUrl} style={{ height: 200, width: null, flex: 1 }} alt="" />
                        <form name="profilePic" onSubmit={this.handleUploadImage}>
                            <div style={{ width: '30%' }} class="form-group">
                                Photo
                                <input className="form-control" name="profilePhoto" ref={(ref) => { this.uploadInput = ref; }} type="file" />
                            </div>
                            <button className="btn btn-success" type>Upload</button>
                        </form>
                        <form onSubmit={this.onSubmit} method="post">
                            <div style={{ width: '30%' }} class="form-group">
                                Date Of Birth: <DatePicker required selected={this.state.dob} onChange={this.dobHandler} name="dob" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                City: <input type="text" required onChange={this.onChangeHandler} class="form-control" name="city" value={this.state.city} placeholder="Enter Current City" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                State:  <input type="text" required onChange={this.onChangeHandler} class="form-control" name="state" value={this.state.state} placeholder="Enter Current State" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Country:  <input type="text" required onChange={this.onChangeHandler} class="form-control" name="country" value={this.state.country} placeholder="Enter Country" />
                            </div>
                            <br />
                            <div style={{ width: '30%' }} class="form-group">
                                Career Objective:  <input type="text" onChange={this.onChangeHandler} class="form-control" name="careerObjective" value={this.state.careerObjective} placeholder="Enter Career Objective" />
                            </div>
                            <br />
                            <div>
                                {this.state.error}
                            </div>
                            <div style={{ width: '30%' }}>
                                {this.state.hideButton ? null : <button class="btn btn-success" type="submit">Update Education Details</button>}
                            </div>


                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <img src={this.state.profilePicUrl} style={{ height: 200, width: null, flex: 1 }} alt="" />

                    <div style={{ width: '30%' }}>
                        {this.state.hideButton ? null : <button onClick={this.onClickHandler} class="btn btn-success" type="button">Edit</button>}
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    console.log("my id is:", state.loginInfo.id)
    return {
        id_student: state.loginInfo.id,
        userType: state.loginInfo.userType
    }
}

export default connect(mapStateToProps, null)(StudentBasicDetails);

