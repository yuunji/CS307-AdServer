const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const campaignSchema = new Schema( 
    {
        name: {type: String, required: true, unique: true},
        header: String,
        subheader: String,
        link : String,
        link_text: String,
        link_target_location: String,
        color_scheme: String,
        start:
        {
            type: Date,
            default: Date.now
        },
        end: Date,
        campaign: String,
        location: String
    }, {
        // this removes any trailing whitespace
        timestamps: true, 
      });

module.exports = campaignSchema;