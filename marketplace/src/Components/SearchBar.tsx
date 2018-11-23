import * as React from 'react';
import MediaStreamRecorder from 'msr';
import { TextField, Button } from '@material-ui/core'
import { withStyles, MuiThemeProvider, createMuiTheme }from '@material-ui/core/styles';
import {Mic} from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import orange from '@material-ui/core/colors/orange'

const styles = {
    dense: {
        marginTop: 16,
    },
    resize: {
        fontSize: '18px',
        borderRadius: '20px'
    },
};

interface IHeaderInfoStyles {
    classes: any,
}

interface IProps {
    changeSearch: any,
    searchOff: any,
}

interface IState {
    disabled: boolean,
    response: any,
}

const theme = createMuiTheme({
    palette: {
      primary: orange,
    },
    typography: {
      useNextVariants: true,
    },
  });
  

type HeaderInfoProps = IHeaderInfoStyles & IProps;

class SearchBar extends React.Component<HeaderInfoProps, IState>{
    constructor(props: any) {
        super(props)
        this.state = {
            disabled: false,
            response: ""
        }
        this.startRecording = this.startRecording.bind(this)
        this.postAudio = this.postAudio.bind(this)
        this.makeRequest = this.makeRequest.bind(this)
    }

    public render() {
        return (
            <div className="container" style={{display:'flex', alignItems:'center', marginTop:'55px'}}>
                <TextField
                    className={this.props.classes.resize}
                    id="outlined-full-width"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton id="recordingbutton" onClick={this.startRecording} disabled={this.state.disabled}>
                                    <Mic />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    style={{ marginBottom: 8, width: '70%' , height:'40px'}}
                    placeholder="Search By Title"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <MuiThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" className={this.props.classes.margin} style={{fontSize:'15px',borderRadius:'50px', width:'20%',height:'40px',marginLeft:'10px', fontWeight:"400"}} onClick={this.makeRequest}>
                        Search
                    </Button>
                </MuiThemeProvider>
            </div>
        )
    }

    private makeRequest() {
        const TextField = document.getElementById("outlined-full-width") as HTMLInputElement
        let searchQuery: string = TextField.value
        console.log(searchQuery)
        if (searchQuery.trim() === "") {
            this.props.searchOff()
        }
        else {
            this.props.changeSearch(searchQuery)
        }
    }

    private startRecording() {
        this.setState({ disabled: true })
        const mediaConstraints = {
            audio: true
        }
        const onMediaSuccess = (stream: any) => {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.ondataavailable = (blob: any) => {
                this.postAudio(blob);
                mediaRecorder.stop()

            }
            mediaRecorder.start(3000);
        }
        this.setState({ disabled: false })
        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)

        function onMediaError(e: any) {
            console.error('media error', e);
        }
    }

    private postAudio(blob: any) {
        let accessToken: any;
        fetch(' https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
            headers: {
                'Content-Length': '0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Ocp-Apim-Subscription-Key': '5fe70243893b4731b9de76cb6586b831'
            },
            method: 'POST'
        }).then((response) => {
            // console.log(response.text())
            return response.text()
        }).then((response) => {
            console.log(response)
            accessToken = response
        }).catch((error) => {
            console.log("Error", error)
        });

        fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
            body: blob, // this is a .wav audio file    
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer' + accessToken,
                'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
                'Ocp-Apim-Subscription-Key': '684e64c3f9da42369b8d7370d5563a91'
            },
            method: 'POST'
        }).then((res) => {
            return res.json()
        }).then((res: any) => {
            console.log(res)
            const textBox = document.getElementById("outlined-full-width") as HTMLInputElement
            textBox.value = (res.DisplayText as string).slice(0, -1)
            this.makeRequest();
        }).catch((error) => {
            console.log("Error", error)
        });
    }
}

export default withStyles(styles)(SearchBar);