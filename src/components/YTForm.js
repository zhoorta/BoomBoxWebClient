import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily:'Creepster'
  },
});

export default class YTForm extends Component {

  	render() {

	    return (

	    	<MuiThemeProvider theme={theme}>

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

		    </MuiThemeProvider>
	    	);
	  	}
}