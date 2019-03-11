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
    marginBottom: 100,
    marginTop: 100,
    backgroundColor: '#fff'
  },  
  title: {
    fontSize: 14,
  },
  avatar: {
    height: 75,
    width: 75,
  },  
})



class LoginForm extends Component {

	onChangeSecret = (event) => {
		this.setState({ secret: event.target.value} )
	}

	constructor(props) {
		super(props);
		this.state = { secret: '' }
	}

  	render() {

  		const {classes} = this.props

	    return (
	    	<MuiThemeProvider theme={theme}>
	    		<Card className={classes.formcard}>
	            	<CardContent>
				        <form onSubmit={this.props.submitLogin}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="secret">SECRET</InputLabel>
								<Input id="secret" name="secret" value={this.state.secret} onChange={this.onChangeSecret} />
							</FormControl>
							<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							>
							Login
							</Button>
				        </form>
				    </CardContent>
				</Card>
		    </MuiThemeProvider>
	    	)
	  	}
}


export default withStyles(styles)(LoginForm)