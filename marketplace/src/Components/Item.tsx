import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Modal from 'react-responsive-modal'
import { Col } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import orange from '@material-ui/core/colors/orange'

const styles = {
  card: {
    margin: 10,
  },
  media: {
    height: 250,

  },
};

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
  typography: {
    fontSize: 15,
  },
})

interface IHeaderInfoStyles {
  classes: any,
}
interface IHeaderInfoInjectedProps {
  obj: any,
  isItemMine: any,
  deleteClicked: any
}

type HeaderInfoProps = IHeaderInfoStyles & IHeaderInfoInjectedProps;

interface IState {
  open: boolean,
  edit: boolean
  title: any,
  description: any,
  price: number,
}

class MarketItem extends React.Component<HeaderInfoProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      open: false,
      edit: false,
      title: this.props.obj.title,
      description: this.props.obj.description,
      price: Number(this.props.obj.price),
    }
    this.updateListing = this.updateListing.bind(this)
    this.descriptionChange = this.descriptionChange.bind(this)
    this.titleChange = this.titleChange.bind(this)
    this.priceChange = this.priceChange.bind(this)
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

  public callDelete = () => {
    this.props.deleteClicked(this.props.obj.id);
  }

  public decide = () => {
    if (this.props.obj.userId == this.props.isItemMine) {
      let ar=[]
      ar.push(<Button className='buttonCards' size="medium" variant='contained'color="primary" onClick={this.callDelete}>
      Delete
      <DeleteIcon className={this.props.classes.rightIcon} />
    </Button>)
    ar.push(<Button  variant='contained' className='buttonCards' size="medium" color="primary" onClick={this.callEdit}>
    Edit
  </Button>)
      return (ar)
    }
    return
  }

  public callEdit = () => {
    this.setState({ edit: true })
  }

  public closeEdit = () => {
    this.setState({ edit: false })
  }

  public render() {
    return (
      <div>
        <Col lg={3} md={4} sm={6} xs={12}>
          <Card style={{ height: '420px' }} className={this.props.classes.card} raised={true}>
            <CardMedia
              component="img"
              className={this.props.classes.media}
              image={this.props.obj.url}
              title="Listing"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h4">
                {this.props.obj.title}
              </Typography>
              <br/>
              <Typography gutterBottom variant="h5" component="h5">
                Price: ${this.props.obj.price}
              </Typography>
            </CardContent>
            <MuiThemeProvider theme={theme}>
            <CardActions style={{ position: "relative", bottom: '0', left: '5' }}>
              <Button size="medium" className='buttonCards' variant='contained' color="primary" onClick={this.handleClick}>
                Learn More
                </Button>
              {this.decide()}
            </CardActions>
            </MuiThemeProvider>
          </Card>
        </Col>
        <Modal open={this.state.open} onClose={this.onCloseModal}>
        <Card className={this.props.classes.card} raised={true}>
            <CardMedia
              component="img"
              className={this.props.classes.media}
              image={this.props.obj.url}
              title="Listing"
            />
            <CardContent>
            <Typography gutterBottom variant="h4" component="h4">
                {this.props.obj.title}
              </Typography>
              <br/>
              <Typography gutterBottom variant="h5" component="h5">
                Price: ${this.props.obj.price}
              </Typography>
              <br/>
              <Typography gutterBottom variant="h5" component="h5">
                {this.props.obj.description}
              </Typography>
              <Typography gutterBottom variant="h5" component="h1">
                <br /> Contact email: {this.props.obj.email} <br />Name: {this.props.obj.seller}
              </Typography>
            </CardContent>
            <MuiThemeProvider theme={theme}>
            <CardActions style={{ position: "relative", bottom: '0', left: '5' }}>
              {this.decide()}
            </CardActions>
            </MuiThemeProvider>
          </Card>
        </Modal>
        <Modal open={this.state.edit} onClose={this.closeEdit}>
          <form>
            <div className="form-group">
              <label>Listing Title</label>
              <input type="text" className="form-control" id="Title" placeholder="Title" onChange={this.titleChange} value={this.state.title} />
              <small className="form-text text-muted">You can edit your listings later</small>
            </div>
            <div className="form-group">
              <label></label>
              <input type="text" className="form-control" id="Description" value={this.state.description} onChange={this.descriptionChange} placeholder="Description" />
              <big className="form-text text-muted">Please describe your product</big>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" min="0" className="form-control" id="Price" value={this.state.price} onChange={this.priceChange} placeholder="Enter a price" />
              <small className="form-text text-muted">How much would you like to sell it for?</small>
            </div>

            <button type="button" className="btn" onClick={this.updateListing}>Upload</button>
          </form>
        </Modal>
      </div>
    );
  }

  private descriptionChange() {
    const updated = document.getElementById("Description") as HTMLInputElement
    const changed = updated.value
    this.setState({ description: changed })
  }

  private priceChange() {
    const updated = document.getElementById("Price") as HTMLInputElement
    const changed = Number(updated.value)
    this.setState({ price: changed })
  }

  private titleChange() {
    const updated = document.getElementById("Title") as HTMLInputElement
    const changed = updated.value
    this.setState({ title: changed })
  }
  private updateListing() {
    const url = "https://mpapii.azurewebsites.net/api/Listing/" + this.props.obj.id
    const currentListing = this.props.obj
    const ourState=this.state

    if(ourState.title === null || ourState.description === null || ourState.price === null){
      return
    }
    
    fetch(url, {
      body: JSON.stringify({
        "id": currentListing.id,
        "userId": currentListing.userId,
        "title": this.state.title,
        "url": currentListing.url,
        "description": this.state.description,
        "price": this.state.price,
        "uploaded": currentListing.uploaded,
        "email": currentListing.email,
        "seller": currentListing.seller
      }),
      headers: { 'cache-control': 'no-cache', 'Content-Type': 'application/json' },
      method: 'PUT'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText + " " + url)
        } else {
          this.setState({ edit: false })
        }
      })
  }
}

export default withStyles(styles)(MarketItem);