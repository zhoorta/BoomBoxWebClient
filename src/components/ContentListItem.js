import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
  inactivecard: {
    minWidth: 275,
    marginBottom: 10,
    backgroundColor: '#ff9922'
  },  
  activecard: {
    minWidth: 275,
    marginBottom: 10,
    backgroundColor: '#6fde00'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  avatar: {
    height: 75,
    width: 75,
  },  
})


class ContentListItem extends Component {

    state = {
      anchorEl: null,
      open: false
    }

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
      this.setState({ anchorEl: null });
    }

    deleteContent = (id) => {
      this.props.deleteContent(id)
      this.handleClose()
    }

    playContent = (id) => {
      this.props.playContent(id)
    }

    pauseContent = (id) => {
      this.props.pauseContent(id)
    }

    editContent = (content) => {
      this.props.openContentEditForm(content)
      this.handleClose()
    }

    render() {

      const {anchorEl} = this.state;
      const {classes} = this.props


      return (

         <Card className={ this.props.player.id===this.props.content.id ? classes.activecard : classes.inactivecard}>
            
            <CardContent>

              <Grid container spacing={24}>

                <Grid item xs={2}>
                  <Avatar src={this.props.content.thumbnail_url} className={classes.avatar} />
                </Grid>
                <Grid item xs={8}>

                  <Typography variant="h6" component="h6">
                    {this.props.content.title}
                  </Typography>
                  
                  <Typography color="textSecondary">
                    {this.props.content.length_hours + ' | ' + this.props.content.totallength}
                  </Typography>

                </Grid>

                <Grid item xs={2}>

                  <CardActions>


                    <div>
                      <IconButton size="small"
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                      >
                        <MenuIcon/>
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                      >
                        <MenuItem onClick={ () => this.editContent(this.props.content)}>Edit</MenuItem>
                        <MenuItem onClick={ () => this.deleteContent(this.props.content.id) }>Delete</MenuItem>
                      </Menu>
                    </div>


                    <IconButton aria-label="Play" onClick={() => 

                      { this.props.player.id!==this.props.content.id ? this.props.playContent(this.props.content.id)
                         : this.props.player.status==='paused' ?
                            this.props.playContent(this.props.content.id) 
                            : this.props.pauseContent(this.props.content.id) }} >
                      
                      {
                        this.props.player.id!==this.props.content.id ? <PlayIcon/>
                         : this.props.player.status==='paused' ? <PlayIcon/> : <PauseIcon/>
                      }
                        
                    </IconButton>

                  </CardActions>

                </Grid>
                
              </Grid>

            </CardContent>

          </Card>

        )
      }
        
    }


ContentListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentListItem);