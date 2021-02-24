const adsController = require("../controllers/adsController")
const adRoutes = (app) => {
  
    // create route for donations
    app.route('/ads')
      .get(adsController.getAds)
      .post(adsController.addNewAd)
      .delete(adsController.deleteManyAds);

    // create a new route so you can get these donation entries by their names
    app.route('/ads/:name')
      .get(adsController.getAdsByName)
      .put(adsController.updateAd)
      .delete(adsController.deleteAd);

    // create a new route for getting donation entries by campaign
    app.route('/ads/campaign/:campaign')
      .get(adsController.getAdsByCampaign);
  }

// export adRoutes
module.exports = adRoutes;