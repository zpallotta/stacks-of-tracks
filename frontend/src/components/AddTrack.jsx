import React, {useState} from "react";
import axios from "axios";

function AddTrack() {
    const [input, setInput] = useState({
        artist_name:"",
        track_name:""
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

        axios.post("http://localhost:3001/create", newTrack)
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
            <button onClick={handleClick} className="btn btn-lg btn-info">Add Track</button>
        </form>
    </div>
}

export default AddTrack;
