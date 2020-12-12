const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customImage: {
        type: String
    }
}, {
    collection: "customImages"
});

var Image = mongoose.model("Image", ImageSchema);

module.exports = Image;