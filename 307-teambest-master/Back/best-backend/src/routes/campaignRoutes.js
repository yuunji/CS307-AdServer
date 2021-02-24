const campaignsController = require("../controllers/campaignsController")
const campaignRoutes = (app) => {

    // create route for donations
    app.route('/campaigns')
      .get(campaignsController.getCampaigns)
      .post(campaignsController.addNewCampaign)
      .delete(campaignsController.deleteAllCampaigns);
    
    // create a new route so you can get these donation entries by their ID's
    app.route('/campaigns/:name')
      .get(campaignsController.getCampaignsByName)
      .put(campaignsController.updateCampaign)
      .delete(campaignsController.deleteCampaign)
  }

// export campaignRoutes
module.exports = campaignRoutes;