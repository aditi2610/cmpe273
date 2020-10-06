import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/application.css';
import './../../css/chunk.css';
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

class SkillSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id_student: props.id_student,
            userType: props.userType,
            hideButton: false,
            skill: '',
            list: [],
            edit: false
        };
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onAddSkillHandler = this.onAddSkillHandler.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log("Skill Set => component will receive props", newProps);
        this.setState({
            id_student: newProps.id_student,
            userType: newProps.userType
        },
            this.loadData)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {

        const urlId = getQueryVariable("id")
        console.log("EducationDetails -> loadData -> requested profile id (from url): ", urlId);
        var student_payload;

        if (this.state.userType === 'company') {
            this.setState({
                hideButton: true
            })
        }
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
        axios.post(`${Constants.BACKEND_URL}/studentSkillSet/getSkills`, student_payload)
            .then(response => {
                var skillList = []
                for (var i = 0; i < response.data.length; i++) {
                    //console.log("Response from :", response.data[i]);
                    skillList.push(response.data[i]);
                }
                this.setState({
                    list: skillList
                });
                console.log("Skill SET ", this.state.list);

            })
            .catch(error => {
                console.log("Error in student basic details ", error);
            })
    }


    onChangeHandler = (e) => {
        console.log("Skill Set => OnChangeHandler")
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });

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


    onAddSkillHandler = (e) => {
        e.preventDefault();

        console.log("SKillSEt OnAddSkillHAndler  state is ", this.state)
        const studentSkill = {
            id: this.state.id_student,
            skill: this.state.skill
        };

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${Constants.BACKEND_URL}/studentSkillSet/saveSkills`, studentSkill)
            .then(response => {
                console.log("Status Code : ", response.status);

            });

        this.loadData();

    }
    render() {

        return (

            <div class="container">
                <form>
                    <div class="style__card-item___B1f7m style__large___Kv76x">
                        <h2 class="style__heading___29i1Z style__large___15W-p style__fitted___3L0Tr">Skills</h2>
                    </div>
                    <div class="style__card-item___B1f7m style__large___Kv76x">
                        <div class="student-skills">
                            {this.state.list.map(listItem => (
                                <span class="style__tag___JUqHD" title="Skills here">
                                    <span class="style__content___2INbm">

                                        <span class="style__children___1bmK9">{listItem.skill_name} </span>
                                        <button class="style__remove___2cUUS" aria-label="Remove"></button>
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div class="style__card-item___B1f7m style__large___Kv76x">
                        <form >
                            <div class="style__flex___fCvpa style__justify-space-between___F3m5J">
                                <div class="style__flex-item___2eWZ4">
                                    <div class="style__spacing___2XRvU">
                                        <div class="style__form-field___3lYyO">
                                            <div class="style__form-group-spacing___3cZ0u form-group">

                                                <input onChange={this.onChangeHandler} name="skill" placeholder="Add more skills" type="text" />
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={this.onAddSkillHandler} class="style__base___hEhR9 style__success___S1K0N">Add</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </form>
            </div>
        )

    }
}


const mapStateToProps = state => {
    //console.log("my id is:", state.loginInfo.id)
    return {
        id_student: state.loginInfo.id,
        userType: state.loginInfo.userType
    }
}

export default connect(mapStateToProps, null)(SkillSet);
