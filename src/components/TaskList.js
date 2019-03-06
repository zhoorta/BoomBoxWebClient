import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import TaskListItem from './TaskListItem.js'

class TaskList extends Component {

  render() {

    const { classes } = this.props

    return (


      Object.keys(this.props.tasks).length > 0 ? 
        <Grid item xs={12}>
          <Typography variant="h5" component="h5" className={classes.alignRight}>
            TASKS
          </Typography>
          <Paper className={classes.paperred}>
            { this.props.tasks.map((obj) =>
              <TaskListItem key={obj.id} content={obj} />
              )
            }
           </Paper>
        </Grid>

        : 
        null  
        
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

export default withStyles(styles)(TaskList)