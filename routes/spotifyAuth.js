const express = require('express');
const crypto = require('crypto');
const fetch = require('node-fetch');
const config = require('../config');

const router = module.exports = express.Router();

/** The redirect URI for Spotify to send the user back to. */
const spotifyRedirectURI = `http://localhost:3001/auth/spotify/callback`;

/** The base of the URI that starts the OAuth flow. State is attached later. */
const spotifyAuthURIBase = 'https://accounts.spotify.com/authorize'
	+ `?client_id=${config.spotify.clientID}`
	+ '&response_type=code'
	+ `&redirect_uri=${encodeURIComponent(spotifyRedirectURI)}`
	+ `&scope=${encodeURIComponent([
		'user-read-email',
		'user-read-private',
		'user-library-read',
	].join(' '))}`;

/**
 * Generates an auth URI to redirect the user to given a state.
 * @param {string} state
 * @returns {String}
 */
function authURI (state) {
	return `${spotifyAuthURIBase}&state=${encodeURIComponent(state)}`;
}

/**
 * Generates a formdata body from key-value pairs.
 * @param {object} content
 * @returns {string}
 */
function formData (content) {
	return Object.entries(content)
		.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
		.join('&');
}

/**
 * Base64-encoded credential for the Authorization header, using the client ID
 * as the "username" and the client secret as the "password"
 */
const authCredential = Buffer.from(`${config.spotify.clientID}:${config.spotify.clientSecret}`).toString('base64');

/**
 * Exchanges a code for an access/refresh token pair.
 * @param {string} code
 * @returns {Promise<object>}
 */
async function fetchSpotifyTokens (code) {
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': `Basic ${authCredential}`,
		},
		body: formData({
			// client_id: config.spotify.clientID,
			// client_secret: config.spotify.clientSecret,
			grant_type: 'authorization_code',
			code,
			redirect_uri: spotifyRedirectURI,
		}),
	});


	if (response.status !== 200) {
		console.log(await response.text());
		throw new Error(`spotify gave non-200 response status when requesting tokens: ${response.status}`);
	}

	const data = await response.json();
	if (data.error) {
		throw new Error(`spotify gave an error when requesting tokens: ${data.error}`);
	}
	return {
		accessToken: data.access_token,
		refreshToken: data.refresh_token,
		tokenType: data.token_type,
		scope: data.scope,
		expiresAt: new Date(Date.now() + data.expires_in * 1000),
	};
}

async function fetchSpotifyUserInfo (accessToken) {
	const response = await fetch('https://api.spotify.com/v1/me', {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();
	console.log(data);
	return {
		name: data.display_name,
		avatarURL: data.images[0]?.url || null,
	};
}

// OAuth entry point, generate a state and redirect the user to Spotify
router.get('/', (request, response) => {
	console.log('query:', request.query);
	const state = JSON.stringify({
		// The page we came from send here if user cancels verification
		prev: request.query.prev || 'http://localhost:3000/',
		// The page we want to go to (send here if verification succeeds)
		next: request.query.next || 'http://localhost:3000/',
		// A random element to ensure others can't tamper with the state
		unique: crypto.randomBytes(16).toString('hex'),
	});
	request.session.spotifyState = state;
	console.log('generated state:', state);
	response.redirect(authURI(state));
});

router.get('/callback', async (request, response) => {
	console.log(request.params, request.query);
	const {error, state, code} = request.query;

	// Check for missing state/state mismatch
	if (!state || !request.session.spotifyState || state !== request.session.spotifyState) {
		console.log('Spotify gave incorrect state after auth page: ', state, 'Expected:', request.session.state);
		response.end('Invalid state, try again');
		return;
	}

	// Parse information from the state
	let parsedState;
	try {
		parsedState = JSON.parse(state);
	} catch (parsingError) {
		// This should never happen - we somehow created a state that isn't valid JSON
		console.log('Error when parsing state:', parsingError, 'State:', state);
		response.end('Error parsing state, try again');
		return;
	}
	const {prev, next} = parsedState;
	console.log(parsedState);

	// We're done storing the state now
	delete request.session.spotifyState;

	// Check for access denied (cancellation condition) and other errors
	if (error === 'access_denied') {
		response.redirect(prev);
		return;
	} else if (error) {
		console.log('Spotify gave error after auth page:', error);
		// TODO: error page
		response.end('Spotify returned an error, try again');
		return;
	}

	// Exchange the code for access/refresh tokens
	let tokens;
	try {
		tokens = await fetchSpotifyTokens(code);
	} catch (tokenError) {
		console.log('Error requesting Spotify access token:', tokenError);
		response.end('Error requesting access token, try again');
		return;
	}

	// Store tokens and expiry in the user's session
	request.session.spotifyAccessToken = tokens.accessToken;
	request.session.spotifyRefreshToken = tokens.refreshToken;
	request.session.spotifyTokenExpiresAt = tokens.expiresAt;

	// Fetch Spotify user info and store in the user's session
	try {
		request.session.spotifyUserInfo = await fetchSpotifyUserInfo(tokens.accessToken);
	} catch (userInfoError) {
		console.log('Error fetching Spotify user info:', userInfoError);
		response.end('Error fetching your account details. Please try again. Contact a developer if the error persists.');
		return;
	}

	response.redirect(next);
});

// Gets info about the user's Spotify account
router.route('/about').get((request, response) => {
	console.log(request.session);
	if (request.session.spotifyAccessToken) {
		response.end(JSON.stringify(request.session.spotifyUserInfo));
	} else {
		response.writeHead(404).end();
	}
});

// Logs out of Spotify
router.route('/logout').get((request, response) => {
	delete request.session.spotifyAccessToken;
	delete request.session.spotifyRefreshToken;
	delete request.session.spotifyTokenExpiresAt;
	delete request.session.spotifyUserInfo;

	response.redirect(request.query.next || '/');
});
