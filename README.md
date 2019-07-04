# Spectrofy

The purpose of this app is to allow users to search for tracks via Spotify and see a whimisical vizualization of various data (timbre, pitch, loudness, etc.) for a chosen track.

## To see the app live, please go to [https://spectrofy.netlify.com](https://spectrofy.netlify.com)

## To see code for the app's backend/server, please [go to my github repository for the backend](https://github.com/tri-be/audio-vision), named audio-vision.

## What does the app do?

Spectrofy allows you to search for tracks by artist or track name, and then see a visualization of that track's audio analysis data. Currently, the visualization is in the form of bubbles that float around endlessly.

### At first they might seem to have no meaning, but hopefully this can clarify what is going on until I can further refactor the application:

- Each bubble in a track's visualization represents a 0.2 - 1 second-long segment of the track provided by Spotify's 'track audio analysis' API endpoint.
- Each bubble's diameter/size is determined by the maximum loudness of that specific segment.
- Each bubble's color is determined by it's pitch data. I converted the pitch data for the segment into an RGBA value, with the opacity determined by the data confidence for that specific segment of data.
- Lastly, I really wanted to incorporate the timbre data and some randomness into the visualization. So, I took a random data point from each segment's array of timbre data and used it to determine the bubble's starting location and velocity.

## Overview of the development process: my failures, discoveries, victories, and plans for refactoring
(I hope to update this README with better documentation shortly.)

> **tl;dr** I am so proud of this project, and happy that I stuck with it through to deployment. There are many aspects of the app that I would do differently and plan on incorporating into a refactorization of the code. Mainly, I would actually like to reduce my use of node modules for interacting with Spotify's web API, because although they did a lot of heavy lifting, they also left so many details out and limited the ways I could more transparently and effectively interact with Spotify's endpoints.

When I wanted to build this app for my capstone project at General Assembly, I was advised not to because of the complexity of working with Spotify's Web API and with authentication. However building an app like this has been a dream for me for quite some time, and I believed I was ready to tackle the challenge. The authentication portion and successfully getting data from by requests to Spotify's Web API turned out to be quite a challenge,

**The authentication via Spotify's Web API did turn out to be quite a challenge**,since I had never worked with oAuth2 or any authentication before this project, and I learned so much about the back and forth between my user, my app as the client, and Spotify as the resource.

**Originally I used the [passport-spotify](http://www.passportjs.org/packages/passport-spotify/) Node module to handle the authentication**, but I ran into an issue with storing the accessToken to my MongoDB collection.
This was partially due to my noviceness with how the authentication code flow works, and also due to the fact that Passport was handling a lot of complex logic behind the scenes that I could not find any good explanation of.

**So then I tried using the [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) Node module to handle authentication, however this also lead me to some new problems.**
Somehow, when I logged in to Spectrofy with my Spotify account, I was setting the access token globally, and anyone who went to the domain would already be logged in under my account!

The more I read, I finally realized that the built-in method I was using from spotify-web-api-node was setting the access token globally for the program, so I would have to find a way to set the access token with each request to Spotify's web API. I searched through Spotify's developer site and came across some other projects made by Spotify's developers that utilized the 
