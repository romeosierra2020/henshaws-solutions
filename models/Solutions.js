const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    activated: {
        type: Boolean,
        default: true
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    category: {
        type: String,
    },
    subCategory: {
        type: String,
    },
    shortDescription: {
        type: String,
    },
    longDescription: {
        type: String,
    },
    pictureURI: {
        type: String,
    },
    pictureAltText: {
        type: String,
    },
    kvVideoTitle: {
        type: String,
    },
    kvVideoSrc: {
        type: String,
    },
    kvVideoId: {
        type: String,
    },
    blogTitle: {
        type: String,
    },
    blogLink: {
        type: String,
    },
    appStoreLink: {
        type: String,
    },
    playStoreLink: {
        type: String,
    },
    shopLink: {
        type: String,
    },

    tags: {
        type: Array,
    },
});
Solution = mongoose.model("solution", SolutionSchema);
module.exports = Solution;
