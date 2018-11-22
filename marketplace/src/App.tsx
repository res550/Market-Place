import * as React from 'react';
import { Jumbotron, Col } from 'react-bootstrap'
import './App.css';
import Facebook from './Components/Facebook';
import SearchBar from './Components/SearchBar'
import Header from './Components/Header';
import Item from './Components/Item';


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
  isSearchTitle:any,
  isSearchUser:any,
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
      isSearchTitle:false,
      isSearchUser:false,
    }
    this.launchScreen = this.launchScreen.bind(this)
    this.generateAllListing = this.generateAllListing.bind(this)
    this.normalView=this.normalView.bind(this)
  }

  public setDisplayListing = (json:any) => {
    this.setState({allResponse:json,
    isSearchTitle:true})
  }

  public searchoff = () => {
    this.setState({isSearchTitle:false})
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
    if(this.state.loggedIn == false){
      return(<div style={{height:'100%'}}>
      {(this.launchScreen())}
      </div>)
    }
    else{
      return(<div>{this.normalView()}</div>)
    }
  }

  private launchScreen() {
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

/*   private onCloseModal = () => {
    this.setState({ createmode: false });
  };*/

  private normalView() {
    return (
      <div>
        <Header name={this.state.name} imageurl={this.state.picture} createClicked={this.createClicked} userOnly={this.state.userOnly} 
                editClicked={this.editClicked} deleteClicked={this.deleteClicked} userOnlyFunc={this.userOnlyFunc} />
        <SearchBar changeSearch={this.setDisplayListing} searchOff={this.searchoff}/>
        {this.generateAllListing()}
      </div>
    )
  }
  private generateAllListing() {
    if(!this.state.isSearchTitle && !this.state.isSearchUser){
    const url = "https://marketplaceapi.azurewebsites.net/api/Listing"
    fetch(
      url, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        this.setState({ allResponse: json });
      })
    return this.makeItems();
    }
  }
  public makeItems(): any {
    if (this.state.allResponse == "") {
      return
    }
    else {
      let toReturn: any[] = []
      this.state.allResponse.forEach((i: any) => {
        toReturn.push(<Item obj={i} />)
      });
      return toReturn
    };
  }
}

export default App;
