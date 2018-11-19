import * as React from 'react'
import FacebookLogin from 'react-facebook-login'

interface IState{
    isloggedIn:any,
    userId:any,
    name:any,
    email:any,
    picture:any,
}
interface IProps{
    setParentState:any
}

export default class Facebook extends React.Component<IProps,IState> {
    constructor(props:any){
       super(props) 
       this.state={
            email:"",
            isloggedIn:false,
            name:"",
            picture:"",
            userId:"",
       }
       this.responseFacebook=this.responseFacebook.bind(this)
    }
    
    public responseFacebook = (response:any) => {
        // tslint:disable-next-line:no-console
        this.props.setParentState(response);
    }
    
    // tslint:disable-next-line:no-console
    public componentClicked = () => console.log('clicked')
    
    public setContent = () =>{
        if(this.state.isloggedIn){
            return(null)
        }else{
            return(<FacebookLogin
            appId="320000591921334"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />)       
        }
    }

    public render(){
    let fbContent=this.setContent();
    return(
    <div>
        {fbContent}    
    </div>
    );}

}
