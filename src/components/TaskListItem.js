import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  downloadcard: {
    minWidth: 275,
    marginBottom: 10,
    backgroundColor: '#ff9922'
  },  
  title: {
    fontSize: 14,
  },
  avatar: {
    height: 75,
    width: 75,
  },  
})


class TaskListItem extends Component {


    render() {

      const {classes} = this.props

      return (

         <Card className={classes.downloadcard}>
            
            <CardContent>

              <Grid container spacing={24}>

                <Grid item xs={2}>
                  <Avatar src={this.props.content.thumbnail_url} className={classes.avatar} />
                </Grid>
                <Grid item xs={10}>

                  <Typography variant="h6" component="h6">
                    {this.props.content.title}
                  </Typography>
                  
                  <Typography color="textSecondary">
                    {this.props.content.progress + '% downloaded'}
                  </Typography>

                </Grid>
                
              </Grid>

            </CardContent>

          </Card>


        )
      }
        
    }


TaskListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskListItem);