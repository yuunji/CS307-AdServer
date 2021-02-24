import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditAd from '../../../widgets/editAd.js';

export default function dynamicEditAd(){
  const router = useRouter();
  const { adId } = router.query;
    if(adId == undefined) {
      return (
        <div>
          <CircularProgress />
        </div>);
    }
    return (<EditAd adId={adId}  />);
    
}
