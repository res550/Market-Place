import * as React from 'react';
import './App.css';
import Facebook  from './Components/Facebook';
import Modal from 'react-responsive-modal';
import Header from './Components/Header';

interface IState{
  loggedIn:boolean,
  name:any,
  picture:any,
  id:any,
  email:any,
  createmode:boolean,
  editmode:boolean,
  deletemode:boolean,
}
class App extends React.Component<{},IState>{
  
  constructor(props:any){
      super(props);
      this.state={
        loggedIn:false,
        name:"",
        picture:"",
        id:"",
        email:"",
        createmode:false,
        editmode:false,
        deletemode:false,
      }
      this.showAll=this.showAll.bind(this);
      this.launchScreen=this.launchScreen.bind(this)
  }
  
  public createClicked = () => {
    this.setState({
      createmode:true,
    })
  }

  public checkState=() => {
    if(this.state.createmode){
        return(<div>{this.createView()}</div>)
    // }else if (this.state.deletemode) {
    //     return(this.deleteView())
    // } else if(this.state.editmode){
    //     return(this.editView())
    }else{
        return(this.normalView())
    }
  }

  public setUserData = (response:any) => {
      if("status" in response){
        console.log("we did it")
      }
      else{
        this.setState({
          loggedIn:true,
          name:response.name,
          picture:response.picture.data.url,
          email:response.email,
          id:response.id
        })
        console.log(response.name)
      }
  }
  
  public render() {
    return (
      <div>
        {this.launchScreen()}
      </div>
    );
  }

  private launchScreen(){
    if(this.state.loggedIn == false){
      return(<Facebook setParentState={this.setUserData}/>)
    }
    else{
      return(<div className="container-fluid">{this.checkState()}</div>)
    }
  }

  private showAll(){
      return(<h1>Hello</h1>)
  }

  private createView(){
    const open = this.state.createmode;
    return(<Modal open={open} onClose = {this.onCloseModal}>
      <form>

      </form>
    </Modal>)
  }

	private onCloseModal = () => {
		this.setState({ createmode: false });
  };
  
  private normalView() {
    return(<Header name={this.state.name}  imageurl={this.state.picture}  createClicked={this.createClicked}/>)
  }
}

export default App;
