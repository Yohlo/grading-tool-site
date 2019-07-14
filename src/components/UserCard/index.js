import React, { Component } from "react";
import { Card, H5 } from '@blueprintjs/core';
import './styles.css';

export default class UserCard extends Component {
    constructor(props) {
        super(props)
        this.props = props;
    }

    render() {
        const { login, avatar_url, name} = this.props;

        return <Card className="user-card">
            <img src={avatar_url && avatar_url.replace('?', '')} alt="GitHub Avatar" />
            <div className="user-card-body">
                <H5 className="name">{name}</H5>
                <p className="login">{login}</p>
            </div>
        </Card>
    }
}