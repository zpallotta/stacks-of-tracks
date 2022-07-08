# Stacks of Tracks

This repo contains the code to get the web frontend working.

## Setup

You'll want to install the current LTS version of Node.js from https://nodejs.org/.

This project comes in two parts, the API server and the React frontend, which will need to be prepared separately:

	# clone the repo
    git clone https://github.com/zpallotta/stacks-of-tracks.git
	cd stacks-of-tracks
	# install dependencies for the express API
	npm install
	# install dependencies for the react frontend
	cd frontend
	npm install

From there, run `npm run start` in the root directory to start the API server, then in a second terminal, run `npm run start` from the frontend directory to start the frontend dev server and API proxy. Then navigate to http://localhost:3000 to view the application.
