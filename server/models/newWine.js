var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newWine = new Schema({
    name: { type: String},
    varietal: { type: String},
    appelation: { type: String},
    region: { type: String},
    imgurl: {type: String},
    cost: {type: Number},
    price: {type: Number},
    inventory: {type: Number},
    tastingnotes: {type: String},
    wineryinfo: {type: String}
});

module.exports = mongoose.model("Wine", newWine);
