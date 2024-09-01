# Woorf Site Code

### a web application built with the MERN stack and React-Router-Dom

## A website to find all your favourite freeware software and games, with no ads and instant downloads..

# Info

It uses an ExpressJS backend to handle all request and MongoDB stock nodejs driver for interacting with the database
I`m not entirely sure about using Mongoose, since i've had a ton of fun without it, and i think the freedom to create documents in any shape or form you want, atleast for a application like this where you dont have thousands of documents, is alot better and less prone to errors that take forever to fix

For the frontend i've settled on ReactJS + React Router Dom, and its using the structure from the docs, i dont see it very often but it looks to me as if its the exact same functionality, just less readable, for now ill leave it where it is

I'm using DaisyUI because i really dont want to spend hours writing CSS that doesn't work as i intended. Right now there arent any themes and its just black and white mostly, but im going to add those at the very end since i dont want it to interfere with the actual development




# Features

### Alternative Search

Search for alternatives to a paid program using our Alternative Search Feature
### Fastest instant downloads
No waiting times, instantly get your file when you click download for your platform
### (Coming Soon) Game Finder

Find games based on similarity with others, computer hardware with an automated detection tool, or the best browser games...

## Editing the code
Why are you doing this? My code is messy as hell, but if you want to get started:

First, obviously you are gonna need to setup MongoDB to work with your database instead of mine (changing collection names, etc)

And once all of that is done (10-15 minutes, you also have to create a few dummy documents so you can actually see the data, see index.js for the structure)

you can follow these steps to get it running:

Download zip of the source code
Extract
Open in your preferred editor (i use VSCode)
Then, open a terminal and then do these commands (its required to be run in order):
`cd client`
`npm install`
`cd ..`
`cd server`
`npm install`
This will install all the dependencies quickly
Now, in the current window run
`npm start`
This will start the server, next open a new terminal and then
`cd client`
`npm run dev`

