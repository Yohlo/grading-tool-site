import React, { Component } from "react";
import { connect } from 'react-redux';
import StudentSuggest from '../StudentSuggest';
import { getStudent } from '../../actions';
import UserCard from '../UserCard';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {}
        this.handleStudentChange = this.handleStudentChange.bind(this);
    }

    handleStudentChange(selectedStudent) {
        this.setState({ selectedStudent });
        this.props.getStudent(selectedStudent.login)
    }

    render() {
        // console.log(this.props)
        return <div>
            <p>Search for a student below using their name or username.</p>
            <StudentSuggest handleChange={this.handleStudentChange}/>
            <p></p>
            {
                this.props.student ?
                <UserCard 
                    login={this.props.student.login}
                    name={this.props.student.name}
                    avatar_url={this.props.student.avatar_url}
                />: null
            }
            <p></p>
        </div>;
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        login: state.user.login,
        student: state.admin.student
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        ...props,
        getStudent: (login) => dispatch(getStudent(login))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
