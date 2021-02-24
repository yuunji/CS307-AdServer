import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, ButtonGroup, Container, List, ListItem, makeStyles, Typography, Divider, Grid } from '@material-ui/core'
import { useForm } from "react-hook-form";
import {getAdById, getAdByName, updateAd, deleteAd} from '../src/apiRequests.js';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '25ch',
    },

  ButtonGroup: 
  {
    margin: theme.spacing(1),
  },

  },
}));


export default function editAd(adId){
  const classes = useStyles();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [state, setState] = React.useState({
    name: "",
    header: "",
    subheader: "",
    link: "",
    start: "",
    end: "",
    device: "",
    campaign: "",
    location: "",
    });
    useEffect( () =>  {
      
      async function fetchData() {
      const ad = await getAdByName(adId);
      setState({...state, 
        name: ad.name, 
        header: ad.header,
        subheader: ad.subheader,
        link: ad.link,
        start: ad.start? ad.start.slice(0,10): "2020-12-12",
        end: ad.end? ad.end.slice(0,10) : "2020-12-12",
        device: "",
        campaign: ad.campaign,
        location: ad.location,
      });
    }
    fetchData();
    },
    []
    );
    const handleChange = (event) => {
      let name = event.target.name;
      if(name.length == 0){
        name = event.target.id;
        setState({...state, [name]: event.target.value});
      }
      else{
      setState({...state, [name]: event.target.value});
      }
  };


  const handleDelete = async () => {
     await deleteAd(adId.adId);
     router.push('/');

  };


  const onSubmit = async (data) => {
    console.log(adId)
    const ad = {
      name: adId.adId,
      header: data.header,
      subheader: data.subheader,
      link: data.link,
      colorScheme: data.colorScheme,
      start: data.start,
      end: data.end,
      campaign: data.campaign,
      location: data.location
    }
    await updateAd(ad);
    router.push('/')
  };

    return (
    <div>
    <Typography align="center" variant="h3" color="primary">Edit {adId.adId}</Typography>

    <form noValidate align="center" onSubmit={handleSubmit(onSubmit)} className={classes.root} autoComplete="off">

    <div>
    <TextField required id="standard-required" 
      label="Header"
      variant="outlined" 
      margin='dense'
      value={state.header} 
      onChange={handleChange}
      error={errors.header ? true : false}
      inputProps={{ 
          name: 'header',
        }}
      inputRef={register({ required: true })}/>
    </div>

    <div>
    <TextField  
    id="standard"
    variant="outlined" 
    margin='dense'
    label="Subheader" 
    value={state.subheader} 
    onChange={handleChange}
    inputProps={{ 
        name: 'subheader',
      }}
    inputRef={register({ required: false })}/>
    </div>

    <div>
    <TextField required 
    id="standard-required" 
    variant="outlined"
    margin='dense'
    label="Link" 
    value={state.link} 
    onChange={handleChange} 
    error={errors.link ? true : false}
    inputProps={{ 
        name: 'link',
      }}
    inputRef={register({ required: true })}/>
    </div>

    <div>
    <TextField id="standard" 
      label="Color Scheme"
      margin='dense' 
      variant="outlined"
      value={state.colorScheme} 
      onChange={handleChange} 
      inputProps={{ 
        name: 'colorScheme',
        }}
        inputRef={register({ required: false })}/>
    </div>

    <div>
    <TextField
        id="start"
        variant="outlined"
        margin='dense'
        label="Start Date"
        type="date"
        error={errors.start ? true : false}
        required
        value={state.start} 
        onChange={handleChange}
        name="start"
        className={classes.textField}
        InputLabelProps={{
        shrink: true,
        }}
        inputRef={register({ required: true })}
      />
    </div>

    <div>
    <TextField
        id="end"
        variant="outlined"
        margin='dense'
        label="End Date"
        type="date"
        value={state.end} 
        onChange={handleChange}
        name="end" 
        className={classes.textField}
        InputLabelProps={{
          name: 'end',
          shrink: true,
        }}
        inputRef={register({ required: false })}
      />
    </div>

    <div>
    <TextField 
    id="standard-required"
    variant="outlined" 
    margin='dense'
    label="Device" 
    value={state.device} 
    onChange={handleChange} 
    inputProps={{ 
        name: 'device',
    }}
    inputRef={register({ required: false })}/>
    </div>

    <div>
    <TextField required id="standard-required" 
      label="Campaign"
      variant="outlined"
      margin='dense' 
      value={state.campaign} 
      onChange={handleChange} 
      error={errors.campaign ? true : false}
      inputProps={{ 
          name: 'campaign',
        }}
        inputRef={register({ required: true })}/>
    </div>

    <div>
    <TextField required id="standard-required" 
      label="Location" 
      variant="outlined"
      margin='dense'
      value={state.location} 
      onChange={handleChange} 
      error={errors.location ? true : false}
      inputProps={{ 
          name: 'location',
        }}
        inputRef={register({ required: true })}/>
    </div>

<ButtonGroup>
    <Button 
      type="submit"
      variant="contained" 
      color="primary" 
      disableElevation
      className={classes.button}>
      Submit
  </Button>
    <Button 
      variant="contained" 
      color="secondary" 
      disableElevation
      onClick ={handleDelete}
      className={classes.button}>
      DELETE
  </Button>
</ButtonGroup>

    </form>    
  </div>
    )
}
