import React, {useEffect, useState} from "react";

function SearchTrack() {
    const [tracks, setTracks] = useState([{
        artist_name: "",
        track_name: "",
        track_genre: ""
    }])

    useEffect(() => {
        fetch("/search").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setTracks(jsonRes));
    })

    return <div className="container">
        {tracks.map(track =>
        <div>
            <h1>{track.track_name}</h1>
            <p>Artist: {track.artist_name}</p>
            <p>Genre: {track.track_genre}</p>
        </div>
        )}
    </div>
}

export default SearchTrack;
