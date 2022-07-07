const mongoose = require("mongoose");

const trackSchema = {
    artist_name: String,
    track_name: String,
    track_genre: String
}

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
