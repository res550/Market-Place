import * as React from 'react';
import { Jumbotron, Col } from 'react-bootstrap'
import './App.css';
import Facebook from './Components/Facebook';
import Modal from 'react-responsive-modal';
import Header from './Components/Header';
import Item from './Components/Item';
//import Item from './Components/Item'

interface IState {
  loggedIn: boolean,
  name: any,
  picture: any,
  id: any,
  email: any,
  createmode: boolean,
  editmode: boolean,
  deletemode: boolean,
  userOnly: boolean,
  allResponse: any,
}
class App extends React.Component<{}, IState>{

  constructor(props: any) {
    super(props);
    this.state = {
      allResponse: "",
      loggedIn: false,
      name: "",
      picture: "",
      id: "",
      email: "",
      createmode: false,
      editmode: false,
      deletemode: false,
      userOnly: false,
    }
    this.launchScreen = this.launchScreen.bind(this)
    this.generateListing = this.generateListing.bind(this)
  }

  public createClicked = () => {
    this.setState({
      createmode: true,
    })
    console.log("create")
  }

  public deleteClicked = () => {
    this.setState({
      deletemode: true
    })
    console.log("delete")
  }

  public editClicked = () => {
    this.setState({
      editmode: true,
    })
    console.log("edit")
  }

  public userOnlyFunc = () => {
    if (this.state.userOnly == false) {
      this.setState({ userOnly: true })
      return true
    }
    else {
      this.setState({ userOnly: false })
      return false
    }
  }

  public checkState = () => {
    if (this.state.createmode) {
      return (<div>{this.createView()}</div>)
      // }else if (this.state.deletemode) {
      //     return(this.deleteView())
      // } else if(this.state.editmode){
      //     return(this.editView())
    } else {
      return (this.normalView())
    }
  }

  public setUserData = (response: any) => {
    if ("status" in response) {
      console.log("we did it")
    }
    else {
      this.setState({
        loggedIn: true,
        name: response.name,
        picture: response.picture.data.url,
        email: response.email,
        id: response.id
      })
      console.log(response.name)
    }
  }

  public render() {
    return (
      <div style={{height:'100%'}}>
        {this.launchScreen()}
      </div>
    );
  }

  private launchScreen() {
    if (this.state.loggedIn == false) {
      return (
        <div className="centered">
        <Jumbotron className="JbRound" style={{textAlign:'center',padding:'20px'}}>
          <h1 className="JbHead">Market-Place</h1>
          <p className="JbHead">
            Please Login with facebook to continue
          </p>
          <div className="login">
          <Col>
            <Facebook setParentState={this.setUserData} />
          </Col>
          </div>
        </Jumbotron>
        </div>)
    }
    else {
      return (<div>{this.checkState()}</div>)
    }
  }
  private createView() {
    const open = this.state.createmode;
    return (<Modal open={open} onClose={this.onCloseModal}>
      <form>

      </form>
    </Modal>)
  }

  private onCloseModal = () => {
    this.setState({ createmode: false });
  };

  private normalView() {
    return (
      <div>
        <Header name={this.state.name} imageurl={this.state.picture} createClicked={this.createClicked} userOnly={this.state.userOnly} editClicked={this.editClicked} deleteClicked={this.deleteClicked} userOnlyFunc={this.userOnlyFunc} />
        {this.generateListing()}
      </div>
    )
  }
  private generateListing() {
    const url = "https://marketplaceapi.azurewebsites.net/api/Listing"
    fetch(
      url, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        this.setState({ allResponse: json });
      })
    console.log(this.state.allResponse)
    if (this.state.allResponse == "") {
      return
    }
    else {
      let toReturn: any[] = []
      this.state.allResponse.forEach((i: any) => {
        toReturn.push(<Item obj={i} />)
      });
      console.log(toReturn)
      return toReturn
    }
  }
}

export default App;
