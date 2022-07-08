const express = require("express");
const router = express.Router();
const Track = require("../models/trackModel");

router.route("/create").post((req, res) => {
    const artist_name = req.body.artist_name;
    const track_name = req.body.track_name;
    const track_genre = req.body.track_genre;
    const newTrack = new Track({
        artist_name,
        track_name,
        track_genre
    });

    newTrack.save();

});

router.route("/search").get((req, res) => {
    const search = {};
    if (req.query.artist_name) search.artist_name = req.query.artist_name;
    if (req.query.track_genre) search.track_genre = req.query.track_genre;
    Track.find(search)
        .then(foundTracks => (console.log(foundTracks), res.json(foundTracks)))
})

module.exports = router;
