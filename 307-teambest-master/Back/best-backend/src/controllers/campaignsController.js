const mongoose = require("mongoose");
const campaignSchema = require("../models/campaignModel");
const errors = require("../errors/customErrors");

const Campaign = mongoose.model("Campaign", campaignSchema);

// POST Request: add a new campaign
const addNewCampaign = (req, res) => {
  const newCampaign = new Campaign(req.body);
  newCampaign.save((err, campaign) => {
    if (err) 
    {
      console.log("Error while adding a new campaign.");
      res.status(400).send(new errors.BadRequestError(err));
    }
    else
    {
      console.log("Successfully added a new campaign.");
      res.send(campaign);
    }
  })
}

// GET Request: get all campaigns
const getCampaigns = (req, res) => {
  Campaign.find({}, (err, campaign) => {
    if (err) 
    {
      console.log("Error while getting campaigns.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else if (campaign == null || campaign.length == 0)
    {
      console.log("No campaigns currently exist in the database.");
      res.status(404)
        .send(new errors.NotFoundError("No campaigns currently exist in the database."));      
    }
    else
    {
      console.log("Successfully got all campaigns.");
      res.send(campaign);
    }
  })
}

// DELETE Request: delete all campaigns at once
const deleteAllCampaigns = (req, res) => {
  Campaign.deleteMany((err) => {
    if (err)
    {
      console.log("Error while deleting all campaigns.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else
    {
      res.send("Successfully deleted all campaigns.");
    }
  })
}

////////// Requests Targeting a Specific Campaign //////////

// GET Request: retrieve a campaign by name
const getCampaignsByName = (req, res) => {
  Campaign.findOne({ name: req.params.name }, (err, campaign) => {
    if (err) 
    {
      console.log("Error in getting a campaign by name.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else if (campaign == null)
    {
      console.log("The campaign with the given name was not found.");
      res.status(404)
        .send(new errors.NotFoundError("The campaign with the given name was not found."));      
    }
    else
    {
      console.log("Successfully got campaign by name.");
      console.log(campaign);
      res.send(campaign);
    }
  })
}

// PUT Request: update a campaign
const updateCampaign = (req, res) => {
  Campaign.findOneAndUpdate(
    { name: req.params.name }, 
    req.body, 
    { new: true, useFindAndModify: false }, 
    (err, campaign) => {
    if (err) 
    {
      console.log("No campaign matching that name was found.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else if (campaign == null)
    {
      console.log("The campaign with the given name was not found.");
      res.status(404)
        .send(new errors.NotFoundError("The campaign with the given name was not found."));      
    }
    else
    {
      console.log("Successfully updated campaign.");
      res.send(campaign);
    }
  })
}

// DELETE Request: delete a campaign
const deleteCampaign = (req, res) => {
  Campaign.deleteOne({ name: req.params.name }, (err, campaign) => {
    if (err) 
    {
      console.log("Error while deleting campaign.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else if (campaign == null)
    {
      console.log("The campaign with the given name was not found.");
      res.status(404)
        .send(new errors.NotFoundError("The campaign with the given name was not found."));      
    }
    else
    {
      res.send("Successfully deleted the corresponding campaign.");
    }
  })
}

  module.exports.addNewCampaign = addNewCampaign;
  module.exports.getCampaigns = getCampaigns;
  module.exports.getCampaignsByName = getCampaignsByName;
  module.exports.updateCampaign = updateCampaign;
  module.exports.deleteCampaign = deleteCampaign;
  module.exports.deleteAllCampaigns = deleteAllCampaigns;