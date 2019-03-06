import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { ReactComponent as Logo } from '../logo.svg'

import ReactAudioPlayer from 'react-audio-player';

class Header extends Component {

  componentDidUpdate = (prevProps, prevState, snapshot) =>{
    
    if(prevProps.player!==this.props.player) {
      if(prevProps.player.id===this.props.player.id && this.props.player.status==='paused') this.rap.audioEl.pause()
      else this.rap.audioEl.play()
    }
  }


  render() {

    const { classes } = this.props

    return (
      
      <Paper className={classes.paperheader}>

        <Grid container spacing={24}>

          <Grid item xs={6}>
            <Logo className={classes.logo}/>
          </Grid>
          <Grid item xs={6}>

            <Grid className={classes.playergrid} container>
               <ReactAudioPlayer
                  src={this.props.player.url}
                  ref={(element) => { this.rap = element }}
                  controls
                  autoplay
                />
            </Grid>

          </Grid>

        </Grid>

      </Paper>

    )
  }

}


const styles = theme => ({
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

export default withStyles(styles)(Header)
