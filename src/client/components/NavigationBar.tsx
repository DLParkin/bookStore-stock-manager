import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

class NavigationBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navCollapsed: true,
      showNavbar: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={RRNavLink} exact to="/">
            Book Store App
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavLink tag={RRNavLink} exact to="/AddAuto/">
                Auto Add
              </NavLink>
              <NavLink tag={RRNavLink} to="/AddManual/">
                Manual Add
              </NavLink>
              <NavLink tag={RRNavLink} to="/RemoveAuto/">
                Auto Remove
              </NavLink>
              <NavLink tag={RRNavLink} to="/Find/">
                Find Books
              </NavLink>
              <NavLink tag={RRNavLink} to="/Stats/">
                Stats
              </NavLink>
              <NavLink tag={RRNavLink} to="/RequestPage/">
                Request Add
              </NavLink>
              <NavLink tag={RRNavLink} to="/ReportPage/">
                Report Page
              </NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

export interface IProps {}

export interface IState {
  isOpen: boolean;
  navCollapsed: boolean;
  showNavbar: boolean;
}

export default NavigationBar;
