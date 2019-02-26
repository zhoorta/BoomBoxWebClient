import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ContentList from './components/ContentList.js'
import YTForm from './components/YTForm.js'
import ContentEditForm from './components/ContentEditForm.js'

import { ReactComponent as Logo } from './logo.svg'

import ReactAudioPlayer from 'react-audio-player';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily:'Oswald'
  }
});


const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "#00dede"
  },  
  container: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(800 + theme.spacing.unit * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left'
  },    
  paperred: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    backgroundColor: "#de0000"
  },  
  paperheader: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    backgroundColor: '#de0000'
  }, 
  playergrid: {
    marginTop: 40,
    opacity: 0.7
  },  
  logo: {
    height: 128
  },
})

class App extends Component {

    constructor() {
      super();
      this.state = {
        content: [],
        tagged_content: [],
        tasks: [],
        player: {id: 0, url: '', status:''},
        editcontentdialog: { open:false, content: {} }
      }
      this.server="http://172.104.149.192:1973"
      this.server="http://localhost:1973"
    }


  componentDidMount() {
    //this.refreshContent() 
    this.refreshTaggedContent() 
    this.refreshTasks()
    this.timer = setInterval(() => {this.refreshTasks()}, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  refreshTasks = () => {        
    fetch(this.server + '/tasks')
      .then(response => response.json())
      .then(tasks => { 
        if(Object.keys(this.state.tasks).length!==Object.keys(tasks).length) this.refreshContent()
        this.setState({ tasks: tasks }) 
      })
  }

  refreshContent = () => {     
    fetch(this.server + '/content/')
      .then(response => response.json())
      .then(content => { this.setState({ content: content }) })
  }


  refreshTaggedContent = () => {     
    fetch(this.server + '/content/sort/by/tag')
      .then(response => response.json())
      .then(tagged_content => { this.setState({ tagged_content: tagged_content }) })
  }


  submitNewTask = (event) => {

      event.preventDefault()
      const data = new FormData(event.target)

      fetch(this.server + '/download', {
        method: 'POST', 
        body: JSON.stringify({ url: data.get('url') }),
        headers:{'Content-Type': 'application/json'}
      })      
      .then(response => response.json())
      .then(tasks => { this.setState({ tasks: tasks }) })
  }

  playContent = async (id) => {

    if(this.state.player.id!==id) {
      await this.setState({ player: {id: id, url: this.server + '/content/' + id, status: 'playing'}  })
    }
    else {
      if(this.state.player.status==='paused') {
        await this.setState({ player: {id: id, url: this.server + '/content/' + id, status: 'playing'}  })
        this.rap.audioEl.play()
      }
      else await this.setState({ player: {id: id, url: this.server + '/content/' + id, status: 'paused'}  })
    }

    this.rap.audioEl.play()
  }

  pauseContent = async (id) => {
    await this.setState({ player: {id: id, url: this.server + '/content/' + id, status: 'paused'}  })
    this.rap.audioEl.pause()
  }

  deleteContent = (id) => {
    fetch(this.server + '/content/' + id + '/delete')
      .then(response => response.json())
      .then(content => { this.setState({ content: content }) })
  }

  openContentEditForm = (content) => {
    this.setState({ editcontentdialog: {open: true, content: content } })
  }

  closeContentEditForm = () => {
    this.setState({ editcontentdialog: {open: false, content: {} } })
  }

  submitContentEditForm = (content) => {

    fetch(this.server + '/content/update', {
      method: 'POST', 
      body: JSON.stringify({ content: content }),
      headers:{'Content-Type': 'application/json'}
    })      
    .then(response => response.json())
    .then(content => { this.setState({ content: content }) })

    this.closeContentEditForm()
 
  }

  render() {

    const { classes } = this.props;

    return (

      <MuiThemeProvider theme={theme}>

        <div className={classes.root}>

          <div className={classes.container}>

            <Grid container spacing={24}>

              <Grid item xs={12}>

                <Paper className={classes.paperheader}>

                  <Grid container spacing={24}>

                    <Grid item xs={6}>
                      <Logo className={classes.logo}/>
                    </Grid>
                    <Grid item xs={6}>

                      <Grid className={classes.playergrid} container>
                         <ReactAudioPlayer
                            src={this.state.player.url}
                            ref={(element) => { this.rap = element; }}
                            controls
                            autoplay
                          />
                      </Grid>

                    </Grid>

                  </Grid>

                </Paper>

              </Grid>

              <Grid item xs={12} >
                <Paper className={classes.paperred}>
                  <ContentList content={this.state.content} tasks={this.state.tasks} player={this.state.player} playContent={this.playContent} pauseContent={this.pauseContent} deleteContent={this.deleteContent} openContentEditForm={this.openContentEditForm} />
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <YTForm submitNewTask={this.submitNewTask}/>
                </Paper>
              </Grid>
             
            </Grid>

          </div>


          <ContentEditForm
            content={this.state.editcontentdialog.content}
            open={this.state.editcontentdialog.open}
            submitContentEditForm={this.submitContentEditForm}
            closeContentEditForm={this.closeContentEditForm}
          />

        </div>

      </MuiThemeProvider>

    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App)
