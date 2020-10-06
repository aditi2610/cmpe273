import React, { Component } from 'react';
import EducationDetail from './../StudentDetails/EducationDetails';
import ExperienceDetail from './../StudentDetails/ExperienceDetails';
import BasicDetail from './../StudentDetails/StudentBasicDetails';
import ContactDetail from './../StudentDetails/ContactInfo';
import StudentDocument from './../StudentDetails/StudentDocuments';
import { connect } from "react-redux";
import './../../css/profile.css';
import './../../css/application.css';
import './../../css/chunk.css';
import SkillSet from '../StudentDetails/SkillSet';

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Profile constructor");
        this.state = {
            id_student: props.id_student,
        }

    }
    componentWillReceiveProps(newProps) {
        console.log("my new props", newProps)
        this.setState({
            id_student: newProps.id_student,
        })
    }


    render() {
        //debugger;
        console.log("Inside render of Profile : ", this.state.id_student);
        return (
            <div>
                <br />
                <div class="container">
                    <div class="col-md-4">
                        <div class="style__card___1rhof">
                            <BasicDetail></BasicDetail>
                        </div>
                        <div class="style__card-item___B1f7m style__large___Kv76x">
                            <ContactDetail></ContactDetail>
                        </div>

                        <div class="student-profile-card card-student-documents style__card___1rhof">
                            <StudentDocument></StudentDocument>
                        </div>
                        <div class="style__card___1rhof">
                            <SkillSet></SkillSet>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="style__card___1rhof">
                            <EducationDetail></EducationDetail>
                        </div>
                        <div class="style__card___1rhof">
                            <ExperienceDetail></ExperienceDetail>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    //return  {username: state.loginInfo.username}
    console.log("my username", state.loginInfo.id)
    return { id_student: state.loginInfo.id, }
}


export default connect(mapStateToProps, null)(Profile);
//export default Profile;