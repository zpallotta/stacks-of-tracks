const express = require("express");
const router = express.Router();
const Track = require("../models/trackModel");

router.route("/create").post((req, res) => {
    const artist_name = req.body.artist_name;
    const track_name = req.body.track_name
    const newTrack = new Track({
        artist_name,
        track_name
    });

    newTrack.save();

});

router.route("/search").get((req, res) =>{
    Track.find()
        .then(foundTracks => res.json(foundTracks))
})

module.exports = router;