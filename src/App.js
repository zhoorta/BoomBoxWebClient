import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Header from './components/Header.js'
import TagList from './components/TagList.js'
import TaskList from './components/TaskList.js'
import LoginForm from './components/LoginForm.js'
import YTForm from './components/YTForm.js'
import ContentEditForm from './components/ContentEditForm.js'


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily:'Oswald',
    h5: {
      fontSize: "1.25rem",
      lineHeight: 2
    },
    h6: {
      fontSize: "1.1rem",
      lineHeight: 2
    }
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
    [theme.breakpoints.up(1000 + theme.spacing.unit * 2)]: {
      width: 1000,
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
  alignRight: {
   width: '100%', 
   textAlign: 'right'
  },
})

class App extends Component {

    constructor() {
      super();
      this.state = {
        auth: { authenticated: false, token: '' },
        tagged_content: [],
        tasks: [],
        player: {id: 0, url: '', status:''},
        editcontentdialog: { open:false, content: {} }
      }
      this.server="http://172.104.149.192:1973"
      //this.server="http://localhost:1973"
    }


  async componentDidMount() {
    const authenticated = localStorage.getItem('authenticated')
    if(authenticated==='true') this.refreshToken(localStorage.getItem('key'))
  }


  refreshTasks = () => {        
    fetch(this.server + '/tasks', { headers: { 'x-access-token': this.state.auth.token }})
      .then(response => response.json())
      .then(tasks => { 
        if(Object.keys(this.state.tasks).length!==Object.keys(tasks).length) this.refreshTaggedContent()
        if(Object.keys(tasks).length === 0) this.clearRefreshTasksInterval()
        this.setState({ tasks: tasks }) 
      })
  }

  setRefreshTasksInterval = () => {
    this.timer = setInterval(() => {this.refreshTasks()}, 5000)
  }  

  clearRefreshTasksInterval = () => {
    clearInterval(this.timer)
  }

  refreshContent = () => {     
    fetch(this.server + '/content/', { headers: { 'x-access-token': this.state.auth.token }})
      .then(response => response.json())
      .then(content => { this.setState({ content: content }) })
  }


  refreshTaggedContent = () => {     
    fetch(this.server + '/content/sort/by/tag', { headers: { 'x-access-token': this.state.auth.token }})
      .then(response => response.json())
      .then(tagged_content => { this.setState({ tagged_content: tagged_content }) })
  }

  refreshData = () => {
    this.setRefreshTasksInterval() 
    this.refreshTaggedContent() 
    this.refreshTasks()
  }

  refreshToken = async (secret) => {     
    console.log('refreshToken')
    fetch(this.server + '/auth', {
      method: 'POST', 
      body: JSON.stringify({ secret: secret }),
      headers:{'Content-Type': 'application/json'}
    })      
    .then(response => response.json())
    .then(res => { 
      this.setState({ auth: { authenticated: res.auth, token: res.token}})
      
      if(res.auth===true) {
        localStorage.setItem('authenticated', res.auth)
        localStorage.setItem('token', res.token)
        localStorage.setItem('key', secret)

        this.refreshData()
      }
    })
  }


  submitNewTask = (event) => {

      event.preventDefault()
      const data = new FormData(event.target)

      fetch(this.server + '/download', {
        method: 'POST', 
        body: JSON.stringify({ url: data.get('url') }),
        headers:{
          'Content-Type': 'application/json',
          'x-access-token': this.state.auth.token 
        }
      })      
      .then(response => response.json())
      .then(res => { 
        this.setRefreshTasksInterval()
      })
  }



  submitLogin = (event) => {

      event.preventDefault()
      const data = new FormData(event.target)
      this.refreshToken(data.get('secret'))
  }

  playContent = async (id) => {


    if(this.state.player.id!==id) this.setState({ player: {id: id, url: this.server + '/content/download/' + id, status: 'playing'}  })
    else {
      if(this.state.player.status==='paused') this.setState({ player: {id: id, url: this.server + '/content/download/' + id, status: 'playing'}  })
      else this.setState({ player: {id: id, url: this.server + '/content/download/' + id, status: 'paused'}  })
    }
  }

  pauseContent = async (id) => {
    await this.setState({ player: {id: id, url: this.server + '/content/download/' + id, status: 'paused'}  })
  }

  deleteContent = (id) => {
    fetch(this.server + '/content/' + id + '/delete', { headers: { 'x-access-token': this.state.auth.token }})
      .then(response => response.json())
      .then(tagged_content => { this.setState({ tagged_content: tagged_content }) })
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
      headers:{
        'Content-Type': 'application/json',
        'x-access-token': this.state.auth.token
      }
    })      
    .then(response => response.json())
    .then(tagged_content => { this.setState({ tagged_content: tagged_content }) })

    this.closeContentEditForm()
 
  }

  render() {

    const { classes } = this.props

    return (

      <MuiThemeProvider theme={theme}>

        <div className={classes.root}>

          <div className={classes.container}>

            { this.state.auth.authenticated===true ?

              <Grid container spacing={24}>

                <Grid item xs={12}>
                  <Header player={this.state.player}/>
                </Grid>

                <TagList tagged_content={this.state.tagged_content} player={this.state.player} playContent={this.playContent} pauseContent={this.pauseContent} deleteContent={this.deleteContent} openContentEditForm={this.openContentEditForm} />
                <TaskList tasks={this.state.tasks} />


                <Grid item xs={12}>
                  <Paper className={classes.paperred}>
                    <YTForm submitNewTask={this.submitNewTask}/>
                  </Paper>
                </Grid>
                

              </Grid>

            
            :

              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Paper className={classes.paperred}>
                    <LoginForm submitLogin={this.submitLogin}/>
                  </Paper>
                </Grid>
              </Grid>

             }


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
