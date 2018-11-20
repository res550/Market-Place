import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Modal from 'react-responsive-modal'
import { Col } from 'react-bootstrap';


const styles = {
    card:{
        margin: 10,
      },
  };
  
  interface IHeaderInfoStyles{
      classes:any,
  }
  interface IHeaderInfoInjectedProps {
     obj:any,
 }
  
  type HeaderInfoProps =  IHeaderInfoStyles & IHeaderInfoInjectedProps;

  interface IState{
    open:boolean,
  }

class MarketItem extends React.Component<HeaderInfoProps,IState> {
    constructor(props:any){
        super(props)
        this.state={
            open:false,
        }
    }

    public handleClick= () =>{
        this.setState({
            open:true,
        })
    }

    public onCloseModal = () => {
        this.setState({
            open:false
        })
    }

 public render() {
    return (
        <div>
        <Col lg={3} md={4} sm={6} xs={12}>
        <Card  className={this.props.classes.card} raised={true}>
          <CardMedia
            component="img"
            className={this.props.classes.media}
            image={this.props.obj.url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
             {this.props.obj.title}
            </Typography>
            <Typography component="p">
              {this.props.obj.description}
            </Typography>
          </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={this.handleClick}>
            Learn More
          </Button>
        </CardActions>
      </Card>
      </Col>
      <Modal open={this.state.open} onClose={this.onCloseModal}>
      <Card className={this.props.classes.card}>
          <CardMedia
            component="img"
            className={this.props.classes.media}
            image={this.props.obj.url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
             My Listing Info
            </Typography>
            <Typography component="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta laboriosam temporibus sequi aspernatur rem, voluptatem ipsa maiores esse vitae maxime a consectetur fugiat quasi odio minima facilis velit repellendus? Non.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque eius nemo corrupti aut cum? Voluptatem impedit itaque architecto quaerat? Veritatis dicta neque numquam minus ab, sequi reiciendis error deleniti! Magni!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nostrum cupiditate ducimus qui fugit quibusdam, possimus amet nulla labore similique error minus reiciendis hic quidem totam aut, at quod ex.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, reprehenderit! Quo itaque nisi hic dolor dicta officiis distinctio beatae id ea. Corrupti architecto temporibus quaerat, at omnis ab qui nulla.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor distinctio animi magnam fugit cupiditate ipsa maiores, aut nobis necessitatibus recusandae? Recusandae itaque, molestias laudantium atque culpa eos. Itaque, quos quam!
            </Typography>
          </CardContent>
      </Card>
      </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(MarketItem);