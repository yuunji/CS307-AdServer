import { Button, Container, ListItemSecondaryAction,
   makeStyles, Typography, Grid, TextareaAutosize, MenuItem} 
   from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import createCamp from '../widgets/createCamp.js';
import {getAllAds, getAllCampaigns, deleteAd, getAdsByCampaign} from '../src/apiRequests.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop : theme.spacing(4),
  },
  formControl: {
    minWidth: 300,
  },
  grid: {
    flexGrow: 1,
  },
  marginRoot: {
    padding : theme.spacing(5, 20),
    margin: 'auto',
  },
  spaceGive: {
    paddingTop : theme.spacing(3),
    margin: 'auto'
  },
}));

export default function Home() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    selectedCampaign: "",
    ads: [],
    campaigns: [],
  });

  useEffect(() => {
    initData();
  }, [] );

  const initData = async () => {
    let tempCamps = [];
    let tempAds = [];
    tempAds = await getAllAds();
    tempCamps = await getAllCampaigns();
    setState({
      ...state,
      campaigns: tempCamps,
      ads: tempAds
    })
  }
  const showAll = async () => {
    let tempAds = [];
    tempAds = await getAllAds();
    setState({
      ...state,
      ads: tempAds,
      selectedCampaign: ""
    })
  };
  const makeList = () => {
    return state.ads.map( (ad) => {
      const editUrl = `/ads/edit/${ad.name}`;
      const displayUrl = `/ads/display/${ad.name}`;
      return <ListItem key={ad.name} button component="a" href={displayUrl}>
        <ListItemText primary={ad.name}/>
        <ListItemSecondaryAction >
          <IconButton edge="end" aria-label="comments" href={editUrl}>
            Edit
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    });
    }
  const handleCampaignChange = async (event) => {
    const name = event.target.name;
    let tempAds = [];
    if(event.target.value != ""){
      tempAds = await getAdsByCampaign(event.target.value);
    }
    setState({
      ...state,
      ads: tempAds,
      [name]: event.target.value,
    })
  };

  const handleDelete = async (ad) => {
    await deleteAd(ad);
  };

  const campaignDropDown= () => {
    
    return (<FormControl className={classes.formControl}>
    <InputLabel>Campaign</InputLabel>
    <Select
      value={state.selectedCampaign}
      onChange={handleCampaignChange}
      inputProps={{ 
        name: 'selectedCampaign',
      }}
    >
      {state.campaigns.map( (campaign) => 
      <MenuItem key= {campaign.name} value={campaign.name}>{campaign.name}</MenuItem>
      )}
    </Select>
  </FormControl>);
  };

  return (
    <div>
      <Container align="center" className={classes.marginRoot}>
        <Typography variant="h2" align="center">Welcome to the Ad Server for iFixIT</Typography>
        <Divider />
        <Grid container spacing={3} 
          justify="center" 
          direction="row-reverse" 
          className={classes.spaceGive}>
          <Grid item >{createCamp()}</Grid>
          <Grid item ><Button onClick={showAll} variant="outlined" color="primary">View All Ads</Button></Grid>
        </Grid>
        <List component="nav" className={classes.root}>
          <ListItem key="dropDown">
            <Grid container spacing= {3}>
              <Grid item>{campaignDropDown()}</Grid>
              <Grid item><Typography variant="h5">Campaign: {state.selectedCampaign}</Typography></Grid>
              <Grid item>
                <Button variant="contained" href="/routes/createAd">New Ad</Button>
              </Grid>
            </Grid>
          </ListItem>
          {makeList()}
        </List>
      </Container>
    </div>
  )
}
