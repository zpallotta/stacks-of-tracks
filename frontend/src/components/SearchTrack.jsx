import React, {useEffect, useState} from "react";

function SearchTrack() {
    const [tracks, setTracks] = useState([{
        artist_name: "",
        track_name: ""        
    }])

    useEffect(() => {
        fetch("/search").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setTracks(jsonRes));
    })

    return <div className="container">
        <h1>Search Track page</h1>
        {tracks.map(track =>
        <div>
            <h1>{track.track_name}</h1>
            <p>{track.artist_name}</p>
        </div>
        )}
    </div>
}

export default SearchTrack;
