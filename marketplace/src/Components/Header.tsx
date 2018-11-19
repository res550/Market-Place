import * as React from 'react'
import { Navbar, NavbarBrand, NavbarCollapse, Nav, NavbarToggle, NavItem } from 'react-bootstrap'

interface IProps{
    name:any,
    imageurl:any,
    createClicked:any,
}

export default class Header extends React.Component<IProps>{
    
    public createClicked= () => {
        this.props.createClicked()
    }

    public render(){
        return(
            <div>
                <Navbar collapseOnSelect>
                    <NavbarBrand>
                        MarketPlace
                    </NavbarBrand>
                    <NavbarToggle/>
                    <NavbarCollapse>
                        <Nav>
                        <NavItem eventKey={1} href="#" onClick={this.createClicked}>
                            Create Listing
                        </NavItem>
                        </Nav>
                    </NavbarCollapse>
                </Navbar>
            </div>
        )
    }
}