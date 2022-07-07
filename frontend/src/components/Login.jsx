import React, {useState} from "react";
import "./Login.css"

function Login() {

    const [input, setInput] = useState({
        user_name:"",
        user_pass:""
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

        alert("Logged in!")
    }

    return <div className="container">
    <h1>Login</h1>
    <form>
        <div className="p-2 bg-light border">
            <input onChange={handleChange} name ="user_name" defaultValue={input.artist_name} autoComplete="off" className="form-control" placeholder="Enter username"></input>
        </div>

        <div className="p-2 bg-light border">
            <input onChange={handleChange} name="user_pass" defaultValue={input.track_name} autoComplete="off" className="form-control" placeholder="Enter password"></input>
        </div>

        <button onClick={handleClick} className="btn btn-lg btn-dark">Login</button>
    </form>
</div>
}

export default Login;
