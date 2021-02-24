const { compile } = require("joi");
const mongoose = require("mongoose");
const adSchema = require("../models/adModel");
const errors = require("../errors/customErrors");

const Ad = mongoose.model("Ad", adSchema);

// GET Request: get all ads
const getAds = (req, res) => {
  Ad.find({}, (err, ad) => {
    if (err)
    {
      console.log("Error while getting all ads.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else if (ad == null || ad.length == 0)
    {
      console.log("No ads currently exist in the database.");
      res.status(404).send(new errors.NotFoundError("No ads currently exist in the database."));      
    }
    else
    {
      console.log("Successfully got all ads.");
      res.send(ad);
    }
  })
}

// POST Request: add a new ad
const addNewAd = (req, res) => {
  const newAd = new Ad(req.body);
  newAd.save((err, ad) => {
    if (err)
    {
      console.log("Error while adding a new ad.");
      res.status(400).send(new errors.BadRequestError(err));
    }
    else
    {
      console.log("Successfully added a new ad.");
      res.send(ad);
    }
  })
}

// DELETE Request: delete all ads at once
const deleteManyAds = (req, res) => {
  Ad.deleteMany((err) => {
    if (err)
    {
      console.log("Error while deleting all ads.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else
    {
      res.send("Successfully deleted all ads.");
    }
  })
}

////////// Requests Targeting a Specific Ad //////////

// GET Request: retrieve an ad by name
const getAdsByName = (req, res) => {
  Ad.findOne({name: req.params.name}, (err, ad) => {
    if (err)
    {
      console.log("Error in getting an ad by name.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else if (ad == null)
    {
      console.log("The ad with the given name was not found.");
      res.status(404).send(new errors.NotFoundError("The ad with the given name was not found."));      
    }
    else
    {
      console.log("Successfully got ad by name.");
      console.log(ad)
      res.send(ad);
    }
  })
}

// PUT Request: update an ad
const updateAd = (req, res) => {
  Ad.findOneAndUpdate(
    {name: req.params.name},
    req.body,
    {new: true},
    (err, ad) => {
    if (err)
    {
      console.log("Error in trying to update ad.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else if (ad == null)
    {
      console.log("The ad with the given name was not found.");
      res.status(404).send(new errors.NotFoundError("The ad with the given name was not found."));      
    }
    else
    {
      console.log("Successfully updated ad.");
      res.status(200).send(ad);
    }
  })
}

// DELETE Request: delete a single ad
const deleteAd = (req, res) => {
  Ad.deleteOne({ name: req.params.name }, (err, ad) => {
    if (err)
    {
      console.log("Error while deleting ad.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else if (ad == null)
    {
      console.log("The ad with the given name was not found.");
      res.status(404).send(new errors.NotFoundError("The ad with the given name was not found."));      
    }
    else
    {
      res.send("Successfully deleted the corresponding ad.");
    }
  })
}

////////// Requests Targeting Ads by Campaign //////////

// GET Request: retrieve all ads in the same campaign
const getAdsByCampaign = (req, res) => {
  Ad.find({ campaign: req.params.campaign }, (err, ad) => {
    if (err)
    {
      console.log("Error while getting ads associated with the given campaign.");
      res.status(500).send(new errors.QueryFailError(err));
    }
    else if (ad == null || ad.length == 0)
    {
      console.log("No ads associated with the given campaign were found.");
      res.status(404)
        .send(new errors.NotFoundError("No ads associated with the given campaign were found."));
    }
    else
    {
      console.log("Successfully retrieved ads associated with the given campaign.");
      res.send(ad);
    }
  })
}

module.exports.addNewAd = addNewAd;
module.exports.getAds = getAds;
module.exports.getAdsByName = getAdsByName;
module.exports.updateAd = updateAd;
module.exports.deleteAd = deleteAd;
module.exports.deleteManyAds = deleteManyAds;
module.exports.getAdsByCampaign = getAdsByCampaign;