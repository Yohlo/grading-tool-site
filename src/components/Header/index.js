import React, { Component } from 'react';
import { Navbar, Button, Alignment } from '@blueprintjs/core';
import IconInstructure from '@instructure/ui-icons/lib/Solid/IconInstructure'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { withRouter } from "react-router-dom";

import "./styles.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Grading Tool</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" onClick={() => this.props.history.push('/')} />
          <Button className="bp3-minimal" icon={<IconInstructure />} text="Canvas" onClick={() => this.props.history.push('/Canvas')} />
          <Button className="bp3-minimal" icon={<FontAwesomeIcon icon={faGithub} />} text="GitHub.IU" onClick={() => this.props.history.push('/GitHub')} />
          <Button className="bp3-minimal" icon={<FontAwesomeIcon icon={faQuestion} />} text="Piazza" onClick={() => this.props.history.push('/Piazza')} />
      </Navbar.Group>
  </Navbar>
    );
  }
}

export default withRouter(Header);