import * as React from 'react';
import { Jumbotron, Col } from 'react-bootstrap'
import './App.css';
import Facebook from './Components/Facebook';
import SearchBar from './Components/SearchBar'
import Header from './Components/Header';
import Item from './Components/Item';
import Modal from 'react-responsive-modal'

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
  allResponse: any[],
  isSearchTitle:any,
  isSearchUser:any,
  uploadimage:any,
}
class App extends React.Component<{}, IState>{

  constructor(props: any) {
    super(props);
    this.state = {
      allResponse: [],
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
      uploadimage: null,
    }
    this.launchScreen = this.launchScreen.bind(this)
    this.generateAllListing = this.generateAllListing.bind(this)
    this.normalView=this.normalView.bind(this)
    this.createModal=this.createModal.bind(this)
    this.editModal=this.editModal.bind(this)
    this.onCreateClose=this.onCreateClose.bind(this)
    this.handleFileUpload=this.handleFileUpload.bind(this)
    this.uploadListing=this.uploadListing.bind(this)
    this.setDisplayListing=this.setDisplayListing.bind(this)
    this.searchoff=this.searchoff.bind(this)
  }

  public setDisplayListing = (json:any) => {
    this.setState({
    allResponse:json,
    isSearchTitle:true})
  }

  public searchoff = () => {
    this.setState({isSearchTitle:false})
  }

  public createClicked = () => {
    this.setState({
      createmode: true,
    })
  }

  public deleteClicked = () => {
    this.setState({
      deletemode: true
    })
  }

  public editClicked = () => {
    this.setState({
      editmode: true,
    })
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
    }
    else {
      this.setState({
        loggedIn: true,
        name: response.name,
        picture: response.picture.data.url,
        email: response.email,
        id: response.id
      })
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

  private createModal() {
    return(
    <Modal open={this.state.createmode} onClose={this.onCreateClose}>
    <form>
      <div className="form-group">
        <label>Listing Title</label>
        <input type="text" className="form-control" id="Title" placeholder="Enter Title" />
        <small className="form-text text-muted">You can edit any meme later</small>
      </div>
      <div className="form-group">
        <label></label>
        <input type="text" className="form-control" id="Description" placeholder="Enter Tag" />
        <big className="form-text text-muted">Tag is used for search</big>
      </div>
      <div className="form-group">
        <label>Image</label>
        <input type="file" onChange={this.handleFileUpload} className="form-control-file" accept="image/*" id="meme-image-input" />
      </div>
      <div className="form-group"> 
        <label>Price</label>
        <input type="number" min="0" className="form-control" id="Price" placeholder="Enter a price"/>
        <small className="form-text text-muted">How much you want to sell for homie</small>
      </div>

      <button type="button" className="btn" onClick={this.uploadListing}>Upload</button>
    </form>
  </Modal>)
  }
  public onCreateClose = () =>{
    this.setState({createmode:false})
  }

  private handleFileUpload=(fileList: any)=> {
		this.setState({
			uploadimage:fileList.target.files
    })
  }

	private uploadListing() {
    const titleInput = document.getElementById("Title") as HTMLInputElement
    const descriptionInput = document.getElementById("Description") as HTMLInputElement
    const priceInput = document.getElementById("Price") as HTMLInputElement
    let image=this.state.uploadimage[0]

		if (titleInput === null || descriptionInput === null || image === null || priceInput === null) {
			return;
		}

    const price= priceInput.value
		const title = titleInput.value
		const description= descriptionInput.value
		const url = "https://marketplaceapi.azurewebsites.net/api/Listing/upload"

		const formData = new FormData()
    formData.append("Title", title)
    formData.append("Price",price)
		formData.append("Description", description)
    formData.append("Image", image)
    formData.append("userID",this.state.id)
    formData.append("email",this.state.email)
    formData.append("Seller",this.state.name)

		fetch(url, {
			body: formData,
			method: 'POST'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				this.setState({createmode:false})
			}
		  })
	}
  
  private editModal(){

  }

  private normalView() {
    return (
      <div>
        <Header name={this.state.name} imageurl={this.state.picture} createClicked={this.createClicked} userOnly={this.state.userOnly} 
                editClicked={this.editClicked} deleteClicked={this.deleteClicked} userOnlyFunc={this.userOnlyFunc} />
        <SearchBar changeSearch={this.setDisplayListing} searchOff={this.searchoff}/>
        {this.generateAllListing()}
        {this.createModal()}
        {this.editModal()}
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
    }
    return this.makeItems();
  }
  public makeItems(): any {
    if (this.state.allResponse === []) {
      return
    }
    else {
      let toReturn: any[] = []
      console.log(this.state.allResponse)
      this.state.allResponse.forEach(i => {
        toReturn.push(<Item obj={i}/>)
      });
      return toReturn
    };
  }
}

export default App;
