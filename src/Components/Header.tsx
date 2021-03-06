import * as React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Screenshot from './LogoMakr_9MVTxW.png'
import Checkbox from '@material-ui/core/Checkbox'

interface IProps {
    name: any,
    imageurl: any,
    createClicked: any,
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
            this.props.userOnlyFunc()
        }
        else {
            this.setState({
                current: false,
            })
            this.props.userOnlyFunc()
        }
        console.log(this.state.current)
    }

    public createClicked = () => {
        this.props.createClicked()
    }

    public render() {
        return (
            <div>
                <Navbar fixedTop inverse fluid>
                    <Navbar.Header>
                        <Navbar.Brand style={{padding:'10px'}}>
                            <img src={Screenshot} className="BrandImage" alt="" />
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="" style={{color:'orange'}} onClick={this.props.createClicked}>
                                Create Listing
                            </NavItem>
                            <NavItem className="toggleButton" style={{display:'flex', color:'orange', alignItems:'center'}}>
                                My Listings
                                <Checkbox style={{alignItems:'center',color:'orange'}}className="checked" checked={this.state.current} onClick={this.handleClick}> My Listings </Checkbox>
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <div style={{paddingRight:"15px"}}>
                                <Navbar.Text style={{color:'orange'}} className="Name">
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