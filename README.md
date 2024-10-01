# Project Overview

This is an API for Tongariro Cinemas. It is designed to manage movielistings, users and bookings. It is designed to be later integratable to React to make a wonderful front-end/client side experience.

# Run Instructions

To start and join to server please open the tongariro-cinemas-api folder in VS Code. Then open a new terminal and make sure you have changed directory to tongariro-cinemas-api. Do this by typing cd tongariro-cinemas-api and presing enter.

Then type into the terminal npm install and press enter to install node_modules/ dependencies

From there navigate to the package.json file and double check that "type": "module" is there, if not please place it under main

Now you can start the api by typing node server.js and press enter again

# Testing

To test endpoints I have chosen to use Postman, so please mak sure you have this downloaded on your device. You also will find all url templates for all requests in the rest.http file.

As an example of testing/requests I will use Movie Listings, please note bookings are slightly different and explained at the bottom of this section.

To make POST requests you will copy and paste the corresponding url ( for movie listings it is: http://localhost:3000/api/movies) into the url tab in Postman and select POST in the drop tab. Then select body, raw and JSON. You can then enter a JSON document 1 at a time and press send to add it to the database, here is a document example

{
"listingID": "MOV123",
"title": "Dune: Part Two",
"director": "Denis Villeneuve",
"duration": "2h 46m",
"date": "2024-09-25",
"day": "Wednesday",
"time": "17:20",
"price": 34
}

You will then be able to view/GET this document from your database suing a GET request. Copy and past the corresponding url into Postman, select GET from the drop down and all movie listing entries will be displayed in JSON format.

From there you can also make PUT and DELETE requests. To make either of these requests please again copy and past the corresponding url into Postman, select PUT or DELETE from the drop down and press enter. The example url looks like this:

http://localhost:3000/api/movies/:id.

It is slightly different in that where it says ":id" at the end you need to put the document id in that spot.
It will end up looking someting like this:

http://localhost:3000/api/movies/MOV132

For PUT requests, on Psotman you must click on Body and select raw and JSON, type up a new document with all matching document feilds requeried (you will get an error if you have missed this).

For Booking POST PUT and DELETE requests you will need to add the title id and user id to the document, you can find these by making a get request of user and movie listings. The key and value should look something like this:

"userID": "60c72b2f9b1e8c2c5c4f1f2a" or

"\_id": "66f4a0f2bbe07dc1cb6852f4"
