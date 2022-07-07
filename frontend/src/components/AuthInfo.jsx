import React, {useEffect, useState} from "react";

export default function AuthInfo() {
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		fetch("/auth/spotify/about", {
			credentials: "include",

		})
			.then(response => response.ok ? response.json() : null)
			.then(data => setUserInfo(data));
	}, []);

    return <h4>
		{userInfo == null ? (
			<a className="link" href="http://localhost:3001/auth/spotify?next=http://localhost:3000">Login with Spotify</a>
		) : (
			<span className="userinfo">
				Hi, {userInfo.name}
				&nbsp;(<a className="link" href="http://localhost:3001/auth/spotify/logout?next=http://localhost:3000">Logout</a>)
			</span>
		)}
	</h4>
}
