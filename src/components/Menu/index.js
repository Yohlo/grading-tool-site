import React, { Component } from "react";
import { Menu } from '@blueprintjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop } from '@fortawesome/free-solid-svg-icons'
import UserCard from '../UserCard';
import { assignments } from "../../assignments";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getAssignments, getUser } from '../../actions';
import './styles.css';

//Main layout of the application, idk 
class SiteMenu extends Component {
    constructor(props) {
        super(props)
        this.props = props;

        this.handleClick = this.handleClick.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        if(this.props.assignments.length < 1)
            this.props.getAssignments()
        if(!this.props.login && this.props.access_token)
            this.props.getUser();
    }

    handleClick(id) {
        this.props.history.push(`/Assignments/${id}`)
    }

    render() {
        return (
            <Menu className="menu">
                <UserCard 
                    login={this.props.login}
                    name={this.props.name}
                    avatar_url={this.props.avatar_url}
                />
                <Menu.Divider />
                {
                    this.props.assignments.map((assignment, i) =>
                        <Menu.Item
                            key={`menu-item-${i}`}
                            icon={ assignments[assignment.id] ?
                                <FontAwesomeIcon icon={assignments[assignment.id].icon} /> :
                                <FontAwesomeIcon icon={faDesktop} />
                            } 
                            onClick={() => this.handleClick(assignment.id)} 
                            text={`Assignment ${assignment.id}`}
                            disabled={!assignment.unlocked}
                        ></Menu.Item>
                    )
                }
                <Menu.Divider />
                <p className="footer">email <a href="mailto:kjyohler@iu.edu">kjyohler@iu.edu</a> for support</p>
                <p className="footer">v1.5 - &copy; 2019</p>
            </Menu>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        assignments: state.assignments,
        login: state.user.login,
        name: state.user.name,
        avatar_url: state.user.avatar_url,
        access_token: state.access_token
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        ...props,
        getAssignments: () => dispatch(getAssignments()),
        getUser: () => dispatch(getUser())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SiteMenu));