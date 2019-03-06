import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import ContentList from './ContentList.js'

class TagList extends Component {

  state = {
    anchorEl: null,
  };

  render() {

    const { classes } = this.props

    return (

      this.props.tagged_content.map((obj) => 
        <Grid item xs={12} key={obj.tag}>
          <div>
            <Typography variant="h5" component="h5" className={classes.alignRight}>
              {obj.tag}
            </Typography>
          </div>
          <Paper className={classes.paperred}>
            <ContentList content={obj.content} player={this.props.player} playContent={this.props.playContent} pauseContent={this.props.pauseContent} deleteContent={this.props.deleteContent} openContentEditForm={this.props.openContentEditForm} />
          </Paper>                  
        </Grid>
      
      )
    )
  }

}


const styles = theme => ({  
  paperred: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    backgroundColor: "#de0000"
  },  
  alignRight: {
   width: '100%', 
   textAlign: 'right'
  },
})


export default withStyles(styles)(TagList)