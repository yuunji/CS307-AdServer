import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { postAd, getAllCampaigns } from '../../src/apiRequests.js';
import { useForm } from "react-hook-form";
import createCamp from '../../widgets/createCamp.js';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    paddingTop : theme.spacing(4),
  },
}));

export default function createAd(){
  const classes = useStyles();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [campaignList, setCampaignList] = React.useState([]);
  const [campaign, setCampaign] = React.useState("");
  const onSubmit = async (data) => {
    console.log("test")
    const ad = {
      name: data.name,
      header: data.header,
      subheader: data.subheader,
      link: data.link,
      colorScheme: data.colorScheme,
      start: data.start+"T00:00:00.000Z",
      end: data.end? data.end + "T00:00:00.000Z" : "2020-10-10T00:00:00.000Z",
      campaign: campaign,
      location: data.location
    }
    await postAd(ad);
    router.push('/');
  };
  useEffect(() => {
    initData();
  }, [] );
  const initData = async () => {
    let tempCamps = [];
    tempCamps = await getAllCampaigns();
    setCampaignList(tempCamps);
  }
  const handleCampaignChange = (event) => {
    setCampaign(event.target.value);
  };

  return (
  <div>
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={classes.root} autoComplete="off">
    <Typography align="center" variant="h3">Create Ad</Typography>
    <div align="center">
      <TextField required id="standard-required" 
      label="Name" 
      name='name'
      error={errors.name ? true : false}
      defaultValue=""
      inputProps={{ 
          name: 'name',
        }} 
        inputRef={register({ required: true })}/>
    </div>
    <div align="center">
      <TextField required id="standard-required" 
        label="Header" 
        defaultValue="" 
        error={errors.header ? true : false}
        inputProps={{ 
            name: 'header',
          }}
        inputRef={register({ required: true })}/>
    </div>
    <div align="center">
      <TextField  id="standard" 
        label="Subheader" 
        defaultValue="" 
        inputProps={{ 
            name: 'subheader',
          }}
          inputRef={register({ required: false })}/>
    </div>
    <div align="center">
      <TextField required id="standard-required" 
        label="Link" 
        defaultValue="" 
        error={errors.link ? true : false}
        inputProps={{ 
            name: 'link',
          }}
          inputRef={register({ required: true })}/>
    </div>
    <div align="center">
      <TextField id="standard" 
        label="Color Scheme" 
        defaultValue="" 
        inputProps={{ 
            name: 'colorScheme',
          }}
          inputRef={register({ required: false })}/>
    </div>
    <div align="center">
      <TextField
          id="start"
          label="Start Date"
          type="date"
          error={errors.start ? true : false}
          required
          defaultValue=""
          name="start"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={register({ required: true })}
        />
    </div>
    <div align="center">
      <TextField
          id="end"
          label="End Date"
          type="date"
          defaultValue=""
          name="end" 
          className={classes.textField}
          InputLabelProps={{
            name: 'end',
            shrink: true,
          }}
          inputRef={register({ required: false })}
        />
    </div>
    <div align="center">
      <TextField id="standard-required" 
        label="Device" 
        defaultValue="" 
        inputProps={{ 
            name: 'device',
          }}
          inputRef={register({ required: false })}/>
    </div>
    <div align="center">
      <TextField id="standard-required" 
        label="Campaign" 
        select
        onChange={handleCampaignChange}
        value={campaign} 
        inputProps={{ 
            name: 'campaign',
          }}>
            {campaignList.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
          </TextField>
      {createCamp()}
    </div>
    <div align="center">
      <TextField required id="standard-required" 
        label="Location" 
        defaultValue="" 
        error={errors.location ? true : false}
        inputProps={{ 
            name: 'location',
          }}
          inputRef={register({ required: true })}/>
    </div>
    <div align="center">
      <Button 
        align="center" 
        type="submit"
        variant="contained" color="primary" 
        disableElevation>
        Submit
        </Button>
      </div>
    </form>
  </div>
  )
}
