# Woorf Site Code

### a web application built with the MERN stack and React-Router-Dom

## A website to find all your favourite freeware software and games, with no ads and instant downloads..
#Info

### Current offical site:
server-bzhe.onrender.com


^^^^^^^^^^^^^^^^^^^^^^^^
The above URL is the only offical WOORF site, since the project is open source,
anyone can take the code, create a MongoDB Database, 
and then replace the links with malware.!

The URL may change from time to time, i will update this readme each time, since it runs on a pay-as-you-go style server, if the project domain's is moved, then when you visit the site, you should no longer be able to use the search feature (thats your way of knowing the url moved)

# Tech Stack

Frontend

React

TailwindCSS: I use it because it allows me to easily create any UI element i want from scratch without headaches, and good documentation, plus style purging.
DaisyUI: I use it because i dont want to make EVERY single UI element from scratch

axios: HTTP Requests

Backend
NodeJS
ExpressJS: Feels very fluent and logical to me, from now my go-to backend framework, love the simplicity and light-weight-ness
MongoDB: Same like ExpressJS, very easy to use, no need for any "local db" which adds another step in deploying to the cloud (Like SQL)

# Features

### Alternative Search

Search for alternatives to a paid program using our Alternative Search Feature
### Fastest instant downloads
No waiting times, instantly get your file when you click download for your platform
### (Coming Soon) Game Finder

Find games based on similarity with others, computer hardware with an automated detection tool, or an AI-powered engine that allows you to describe a game and then get a result
## Extra Info
Development is run using ```npm start``` in server, changing port in vite.config.js to 5173, and running ```npm run dev``` in client
For production, use ```npm run build``` in client, then move the dist folder to server, and setup Docker with the NodeJS template, and make sure to remove dist from .dockerignore

