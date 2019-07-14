import React, { Component } from "react";

export default class RedirectOffServer extends Component {

  constructor(props) {
    super(props);

    this.target = props.target;
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentDidMount() {
    window.location.replace(this.target);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.target || this.props.target !== nextProps.target) {
      window.location.replace(nextProps.target);
    }
  }

  render(){
    return (
      <div>
        <span>Redirecting to {this.target}</span>
      </div>
    );
  }
}