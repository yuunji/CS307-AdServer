import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import DisplayAd from '../../../widgets/displayAd.js';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function dynamicDisplayAd(){
  const router = useRouter();
  const { adId } = router.query;
  if(adId == undefined) {
    return (
      <div>
        <CircularProgress />
      </div>);
  }
    return (<DisplayAd adId={adId}  />);
    
}