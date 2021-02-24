import React, { Component, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getAdByName, updateAd, deleteAd} from '../src/apiRequests.js';
import { useRouter } from 'next/router'

const useStyles = makeStyles({
   table: {
     minWidth: 650,
   },
 });

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function createData(name, head, subhead, link, colorScheme, start, end, campaign, location) {
   return { name, head, subhead, link, colorScheme, start, end, campaign, location };
}

export default function DisplayAd(adId){
   //name,head,subhead,link,colorScheme,start,end,campaign,location
    const classes = useStyles();
    const router = useRouter();
    const [state, setState] = React.useState({
      name: "",
      header: "",
      subheader: "",
      link: "",
      start: "",
      end: "",
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
          start: ad.start,
          end: ad.end,
          campaign: ad.campaign,
          location: ad.location,
        });
      }
      fetchData();
      },
      []
      );
    const rows = [
      createData(state.name, state.header, state.subheader, state.link, state.colorScheme, state.start, state.end, state.campaign, state.location)
    ];
    const handleDelete = async () => {
      await deleteAd(adId.adId);
      router.push('/');
   };
   const handleBack = async () => {
    router.push('/');
   };

    return (
    <div>

     <h1>Campaign: { state.campaign }</h1>
     <TableContainer component={Paper}>
       <Table className={classes.table} aria-label="Ad table">
         <TableHead>
           <TableRow>
             <StyledTableCell>Ad Name</StyledTableCell>
             <StyledTableCell align="right">Head</StyledTableCell>
             <StyledTableCell align="right">Subhead</StyledTableCell>
             <StyledTableCell align="right">Link</StyledTableCell>
             <StyledTableCell align="right">ColorScheme</StyledTableCell>
             <StyledTableCell align="right">Start</StyledTableCell>
             <StyledTableCell align="right">End</StyledTableCell>
             <StyledTableCell align="right">Campaign</StyledTableCell>
             <StyledTableCell align="right">Location</StyledTableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {rows.map((row) => (
             <TableRow key={row.name}>
               <StyledTableCell component="th" scope="row">
                 {row.name}
               </StyledTableCell>
               <StyledTableCell align="right">{row.head}</StyledTableCell>
               <StyledTableCell align="right">{row.subhead}</StyledTableCell>
               <StyledTableCell align="right">{row.link}</StyledTableCell>
               <StyledTableCell align="right">{row.colorScheme}</StyledTableCell>
               <StyledTableCell align="right">{row.start}</StyledTableCell>
               <StyledTableCell align="right">{row.end}</StyledTableCell>
               <StyledTableCell align="right">{row.campaign}</StyledTableCell>
               <StyledTableCell align="right">{row.location}</StyledTableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
    &nbsp;
     <TableContainer component={Paper}>
       <Table className={classes.table} aria-label="Ad Reporting Statistics">
         <TableHead>
           <TableRow>
             <StyledTableCell>Ad Name</StyledTableCell>
             <StyledTableCell align="right">Impressions</StyledTableCell>
             <StyledTableCell align="right">Clicks</StyledTableCell>
             <StyledTableCell align="right">Click Rate</StyledTableCell>
             <StyledTableCell align="right">Conversions</StyledTableCell>
             <StyledTableCell align="right">Conversion Rate</StyledTableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {rows.map((row) => (
             <TableRow key={row.name}>
               <StyledTableCell component="th" scope="row">
                 {row.name}
               </StyledTableCell>
               <StyledTableCell align="right">{"25000"}</StyledTableCell>
               <StyledTableCell align="right">{"350"}</StyledTableCell>
               <StyledTableCell align="right">{350/25000}</StyledTableCell>
               <StyledTableCell align="right">{"35"}</StyledTableCell>
               <StyledTableCell align="right">{35/350}</StyledTableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
    &nbsp;
     <ButtonGroup align="center" size="large" color="primary" aria-label="large outlined primary button group">
      <Button
        variant="contained" 
        color="primary" 
        disableElevation
        onClick ={handleBack}
        className={classes.button}>
        BACK
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

     </div>
   );
 }