import * as React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

interface IProps {
    name: any,
    imageurl: any,
    createClicked: any,
}

export default class Header extends React.Component<IProps>{

    public createClicked = () => {
        this.props.createClicked()
    }

    public render() {
        return (
            <div>
                <Navbar inverse fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand">React-Bootstrap</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                Link
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                Link
                            </NavItem>
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Create Listing</MenuItem>
                                <MenuItem eventKey={3.2}>Delete Listing</MenuItem>
                                <MenuItem eventKey={3.3}>Edit Listing</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <div>
                                <Navbar.Text className="Name">
                                    {this.props.name}
                                </Navbar.Text>
                                <img src={this.props.imageurl} className="profileImage" />
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}