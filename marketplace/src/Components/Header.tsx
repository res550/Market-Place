import * as React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Screenshot from './LogoMakr_9MVTxW.png'
import Checkbox from '@material-ui/core/Checkbox'

interface IProps {
    name: any,
    imageurl: any,
    createClicked: any,
    deleteClicked: any,
    editClicked: any,
    userOnly: any,
    userOnlyFunc: any,
}

interface IState {
    current: boolean,
}
export default class Header extends React.Component<IProps, IState>{

    constructor(props: any) {
        super(props)
        this.state = {
            current: true,
        }
        console.log(this.state.current)
    }

    componentDidMount() {
        this.setState({
            current: this.props.userOnly
        })
        console.log("mount")
    }
    public handleClick = () => {
        console.log("handling click")
        if (this.state.current === false) {
            this.setState({
                current: true,
            })
        }
        else {
            this.setState({
                current: false,
            })
        }
        console.log(this.state.current)
        this.props.userOnlyFunc()
    }

    public createClicked = () => {
        this.props.createClicked()
    }

    public render() {
        return (
            <div>
                <Navbar inverse fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <img src={Screenshot} className="BrandImage" alt="" />
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="" onClick={this.props.createClicked}>
                                Create Listing
                            </NavItem>
                            <NavItem eventKey={2} href="" onClick={this.props.editClicked}>
                                Edit Listing
                            </NavItem>
                            <NavItem onClick={this.props.deleteClicked}>
                                Delete Listing
                            </NavItem>
                            <NavItem className="toggleButton">
                                <Checkbox className="checked" checked={this.state.current} onClick={this.handleClick}> My Listings </Checkbox>
                            </NavItem>
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