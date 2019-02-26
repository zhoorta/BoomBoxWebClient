import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { withStyles } from '@material-ui/core/styles';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily:'Creepster'
  },
});


const styles = theme => ({
  formcard: {
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



class YTForm extends Component {

  	render() {

  		const {classes} = this.props

	    return (
	    	<MuiThemeProvider theme={theme}>
	    		<Card className={classes.formcard}>
	            	<CardContent>
				        <form onSubmit={this.props.submitNewTask}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="url">URL</InputLabel>
								<Input id="url" name="url" />
							</FormControl>
							<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							>
							Download
							</Button>
				        </form>
				    </CardContent>
				</Card>
		    </MuiThemeProvider>
	    	)
	  	}
}


export default withStyles(styles)(YTForm)