import React from 'react';
import { Button, makeStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {postCampaign} from '../src/apiRequests.js';
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%'
  },
}));
export default function createCampaign(){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    name: "",
    header: "",
    subheader: "",
    link: "",
    colorScheme: "",
    start: "",
    end: "",
    location: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setState({...state, [name]: event.target.value});
  };

  const handleClickOpen = () => {
      setOpen(true);
    };
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const campaign = {
      name: state.name,
      header: state.header,
  }
    await postCampaign(campaign);
    setOpen(false);
    Router.reload();
  };

  return (
      <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Campaign
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
        <DialogTitle id="form-dialog-title">New Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Campaign Name" 
            value={state.name} 
            onChange={handleChange}
            inputProps={{ 
            name: 'name',
            }}
            required
            size="medium"
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Campaign Header" 
            value={state.header} 
            onChange={handleChange}
            inputProps={{ 
              name: 'header',
            }}
            fullWidth
            multiline={true}
            rows="2"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}