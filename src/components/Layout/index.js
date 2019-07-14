import React, { Component } from "react";
import Header from '../Header';
import Loader from '../Loader';
import Alert from '../Alert';
import Menu from '../Menu';
import './styles.css';

//Main layout of the application 
export default class Layout extends Component {
    constructor(props) {
        super(props)
        this.props = props;
    }

    render() {
        return (
            <>
                <Loader />
                <Alert />
                <Header />
                <div className="app">
                    <Menu />
                    <div className="app-content">
                        {this.props.children}
                    </div>
                </div>
            </>
        );
    }
}