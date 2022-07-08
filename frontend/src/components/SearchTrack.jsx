import React, {useEffect, useState} from "react";

function SearchTrack() {
    const [tracks, setTracks] = useState([])
    const [artist, setArtist] = useState('');
    const [genre, setGenre] = useState('');

    useEffect(() => {
        fetch(`/search?artist_name=${artist}&track_genre=${genre}`).then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setTracks(jsonRes));
    }, [artist, genre]);

    return <div className="container">
        <label>Artist: <input value={artist} onChange={event => setArtist(event.target.value)}></input></label>
        <label>Genre: <input value={genre} onChange={event => setGenre(event.target.value)}></input></label>

        {tracks.map(track =>
            <div>
                <h1>{track.track_name}</h1>
                <p>Artist: {track.artist_name}</p>
                <p>Genre: {track.track_genre}</p>
            </div>
        )}
    </div>;
}

export default SearchTrack;
