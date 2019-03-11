import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';


export default class ContentEditForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: '',
      tag: ''
    }
  }
  
  onEnter = () => {
    this.setState({id: this.props.content.id, title: this.props.content.title, tag: this.props.content.tag})
  }  

  onClose = () => {
  }
  
  onChangeTitle = (event) => {
    this.setState({title: event.target.value});
  }

  onChangeTag = (event) => {
    this.setState({tag: event.target.value});
  }

  closeDialog = () => {
    this.props.closeContentEditForm()
  }
  

  onSubmitContent = (event) => {
    event.preventDefault()
    this.props.submitContentEditForm(this.state)
  }
  

  render() {
    return (
      <form onSubmit={this.onSubmitContent}>

        <Dialog
          open={this.props.open}
          onClose={this.onClose}
          onEnter={this.onEnter}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Content</DialogTitle>
          <DialogContent>

          
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input id="title" name="title" value={this.state.title} onChange={this.onChangeTitle} />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="tag">Tag</InputLabel>
              <Input id="tag" name="tag" value={this.state.tag} onChange={this.onChangeTag} />
            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmitContent} type="submit" color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>

      </form>

    );
  }
}