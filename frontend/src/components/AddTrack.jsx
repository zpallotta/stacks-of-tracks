import React, {useState} from "react";
import axios from "axios";
import "./AddTrack.css"

function AddTrack() {
    const [input, setInput] = useState({
        artist_name:"",
        track_name:"",
        track_genre:""
    })

    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    function handleClick(event) {
        event.preventDefault();
        const newTrack = {
            artist_name: input.artist_name,
            track_name: input.track_name,
            track_genre: input.track_genre
        }

        if(axios.post("http://localhost:3001/create", newTrack))
        {
            alert("Track added successfully.");
        }
    }

    return <div className="container">
        <h1>Add Track</h1>
        <form>
            <div className="p-2 bg-light border">
                <input onChange={handleChange} name ="artist_name" defaultValue={input.artist_name} autoComplete="off" className="form-control" placeholder="Enter artist name"></input>
            </div>

            <div className="p-2 bg-light border">
                <input onChange={handleChange} name="track_name" defaultValue={input.track_name} autoComplete="off" className="form-control" placeholder="Enter track name"></input>
            </div>

            <div className="p-2 bg-light border">
                <select onChange={handleChange} name="track_genre" defaultValue={input.track_genre} className="form-control">
                    <option selected>Select genre...</option>
                    <option value="AltBeats">AltBeats</option>
                    <option value="Black">Black Metal</option>
                    <option value="Classical">Classical</option>
                    <option value="Country">Country</option>
                    <option value="Electronica">Electronica</option>
                    <option value="Folk">Folk</option>
                    <option value="HipHop">HipHop</option>
                    <option value="Punk">Punk</option>
                    <option value="R&B">R&B</option>
                    <option value="Reggae">Reggae</option>
                    <option value="Rock">Rock</option>
                    <option value="SciFi">Sci-Fi</option>
                    <option value="Shoegaze">Shoegaze</option>
                </select>
            </div>

            <button onClick={handleClick} className="btn btn-lg btn-dark">Add</button>
        </form>
    </div>
}

export default AddTrack;
