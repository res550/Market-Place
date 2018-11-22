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
import { CardActionArea } from '@material-ui/core';


const styles = {
  card: {
    margin: 10,
  },
  media: {
    maxHeight: 250,

  },

};

interface IHeaderInfoStyles {
  classes: any,
}
interface IHeaderInfoInjectedProps {
  obj: any,
}

type HeaderInfoProps = IHeaderInfoStyles & IHeaderInfoInjectedProps;

interface IState {
  open: boolean,
}

class MarketItem extends React.Component<HeaderInfoProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      open: false,
    }
  }

  public handleClick = () => {
    this.setState({
      open: true,
    })
  }

  public onCloseModal = () => {
    this.setState({
      open: false
    })
  }

  public render() {
    return (
      <div>
        <Col lg={3} md={4} sm={6} xs={12}>
          <Card className={this.props.classes.card} raised={true}>
           <CardActionArea className={this.props.classes.focusHighlight}>
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
              <Typography gutterBottom variant="h5" component="h1">
               <br/> Contact email: {this.props.obj.email} <br/>Name: {this.props.obj.seller}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={this.handleClick}>
                Learn More
          </Button>
            </CardActions>
            </CardActionArea>
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
                {this.props.obj.description}
              </Typography>
            </CardContent>
          </Card>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(MarketItem);