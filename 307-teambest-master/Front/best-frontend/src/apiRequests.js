const URL = `http://localhost:3001`
export const getAllAds = async () => {
    let tempAds = [];
    await fetch(`${URL}/ads`)
    .then(res => {
      if(!res.ok){
        throw new Error('Bad Request for Ads')
      }
    return res.json()})
    .then(
      (result) =>{
        for(var ad of result){
          tempAds.push({
            id: ad._id,
            name: ad.name,
            header: ad.header,
            subheader: ad.subheader,
            link: ad.link,
            colorScheme: ad.colorScheme,
            start: ad.start,
            end: ad.end,
            campaign: ad.campaign,
            location: ad.location
          })
        }
      })
      return tempAds;
}

export const getAllCampaigns = async () => {
  let tempCamps = [];
  await fetch(`${URL}/campaigns`)
  .then(res => {
    if(!res.ok){
      throw new Error('Bad Request for Campaigns')
    }
  return res.json()})
  .then(
    (result) =>{
      for(var camp of result){
        tempCamps.push({
          name: camp.name,
          header: camp.header,
        })
      }
    })
    return tempCamps;
}

export const getAdById = async (id) => {
  const adId = id.adId;
  let ad = {
    id: adId,
    name: "",
    header: "",
    subheader: "",
    link: "",
    start: "",
    end: "",
    campaign: "",
    location: "",
  };
  await fetch(`${URL}/ads/${adId}`)
  .then(res => {
    if(!res.ok){
      throw new Error('Bad Request for Ad by id')
    }
    return res.json()})
    .then(
      (result) =>{
        ad = result;
      })
      return ad;
}

export const getAdByName = async (name) => {
  const adName = name.adId;
  let ad = {
    name: "",
    header: "",
    subheader: "",
    link: "",
    start: "",
    end: "",
    campaign: "",
    location: "",
  };
  await fetch(`${URL}/ads/${adName}`)
  .then(res => {
    if(!res.ok){
      throw new Error('Bad Request for Ad by id')
    }
    return res.json()})
    .then(
      (result) =>{
        ad = result;
      })
  return ad;
}

export const getCampaignByName = async (name) => {
  let campaign = {};
  await fetch(`${URL}/campaign/${name}`)
  .then(res => {
    if(!res.ok){
      throw new Error('Bad Request for Campaign by name')
    }
    return res.json()})
    .then(
      (result) =>{
        campaign = result;
      })
  return campaign;
}

export const getAdsByCampaign = async (campaignName) => {
  let tempAds = [];
  await fetch(`${URL}/ads/campaign/${campaignName}`)
  .then(res => {
    if(!res.ok){
      throw new Error('Bad Request for Ad by Campaign')
    }
  return res.json()})
  .then(
    (result) =>{
      for(var ad of result){
        tempAds.push({
          id: ad._id,
          name: ad.name,
          header: ad.header,
          subheader: ad.subheader,
          link: ad.link,
          colorScheme: ad.colorScheme,
          start: ad.start,
          end: ad.end,
          campaign: ad.campaign,
          location: ad.location
        })
      }
    })
    return tempAds;
}

export const updateAd = async (ad) => {
  await fetch(`${URL}/ads/${ad.name}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(ad),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Ad Update Data:', data);
    })
    .catch((error) => {
        console.error('Ad Update Error:', error);
    });
}

export const deleteAd = async (adName) => {
  await fetch(`${URL}/ads/${adName}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({name: adName}),
    })
    .then(data => {
        console.log('Ad Deletion Data:', data);
    })
    .catch((error) => {
        console.error('Ad Deletion Error:', error);
    });
}

export const postAd = async (ad) => {
  await fetch(`${URL}/ads`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(ad),
    })
    .then(response => response.json())
    .then(data => {
      if(data.errors){
        console.error('Ad Creation Error:', data.errors)
      }
      else if(data.name == "MongoError"){
        console.error('Duplicate Ad Name')
      }
      else{
        console.log('Ad Creation Data:', data);
      }
        
    })
    .catch((error) => {
        console.error('Ad Creation Error:', error);
    });
}

export const postCampaign = async (campaign) => {
  await fetch(`${URL}/campaigns`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(campaign),
    })
    .then(response => response.json())
    .then(data => {
      if(data.name == "MongoError"){
        console.error('Duplicate Ad Name')
      }
      else{
        console.log('Campaign Creation Success:', data);
      }
    })
    .catch((error) => {
        console.error('Campaign Creation Error:', error);
    });
}