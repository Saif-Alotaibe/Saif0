# Saif0 Full stack

## Introduction 

Saif0 is full stack appliction for Casting Agency where we have movies and actors for those movies.
Saif0 built using React for frontend and Flask REST-API for backend.


## About Saif0

Through the application we can do the following:
1-View Movies,Actors
2-Add Movies,Actors
3-Update Movies,Actors
4-Delete Movies,Actors
5-View Actors for specific movie
6-View Movies for specific actor

## Application url

application hosted using heroku , url of application :`https://saif0.herokuapp.com/
`
### Backend

The `./backend` directory contains a completed Flask server with models,authentication,migrations.
[View the README.md within ./backend for more details.](./backend/README.md)

### Frontend

The `./frontend` directory contains a complete React frontend to consume the data from the Flask server. You will only need to update the variables found within (./frontend/casting_agency/src/Components/Navbar.js) to reflect the Auth0 configuration details set up for the backend app. 

[View the README.md within ./frontend for more details.](./frontend/README.md)
