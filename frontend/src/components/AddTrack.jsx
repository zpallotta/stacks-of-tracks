import React, {useState} from "react";
import axios from "axios";

function AddTrack() {
    const [input, setInput] = useState({
        artist_name:"",
        track_name:"",
        genre_id:""
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
            track_name: input.track_name
        }

        axios.post("https://localhost:3001/create", newTrack)
    }

    return <div className="container">
        <h1>Add Track page</h1>
        <form>
            <div className="form-group">
                <input onChange={handleChange} name ="artist_name" defaultValue={input.artist_name} autoComplete="off" className="form-control" placeholder="Enter artist name"></input>
            </div>

            <div className="form-group">
                <input onChange={handleChange} name="track_name" defaultValue={input.track_name} autoComplete="off" className="form-control" placeholder="Enter track name"></input>
            </div>
            <div className="form-inline">
                <select class="custom-select my-1 mr-sm-2" onChange={handleChange} name="genre_id" defaultValue={input.genre_id} className="form-control">
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
            <button onClick={handleClick} className="btn btn-lg btn-info">Add Track</button>
        </form>
    </div>
}

export default AddTrack;
