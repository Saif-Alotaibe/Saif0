# Full Stack Saif0 Frontend

## Getting Setup

> _tip_: this frontend is designed to work with [Flask-based Backend](../../backend). It is recommended you to run the backend first.

> _tip_: change authnitcation variables for yours , you can find authentication variables inside
`casting_agency/src/Components/Navbar.js`

### Installing Dependencies

#### Installing Node and NPM

This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

#### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the `frontend/casting_agency` directory of this repository. After cloning, open your terminal and run:

```bash
npm install
```

>_tip_: **npm i** is shorthand for **npm install**


## Running Your Frontend in Dev Mode

The frontend app was built using create-react-app. In order to run the app in development mode use ```npm start```. You can change the script in the ```package.json``` file. 

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.<br>

```bash
npm start
```

### Authentication

The authentication system used for this project is Auth0. `./src/Components/Navbar.js` contains the logic to direct a user to the Auth0 login page where `./App.js` managing the JWT token upon successful callback, and handle setting and retrieving the token from the local store. This token is then consumed by several components and passed as an Authorization header when making requests to our backend.

### Authorization

The Auth0 JWT includes claims for permissions based on the user's role within the Auth0 system. This project makes use of these claims using the `can(permission)` method which checks if particular permissions exist within the JWT permissions claim of the currently logged in user. This method is defined in  `./App.js` and is then used to enable and disable buttons in several components.

## Components Structure

The application divdes to several components inside `src` file which describe in the following structure:

    App.js (Root Component used it to handle routing between pages and for token methods)

        |--Navbar.js (Functional Component for displaying Navigation bar and othen functionality depend on role)
        |--Home.js (Class Component for Home Page where we display jwt token)
        |--Footer.js (Functional Component for displaying footer)

        |--AcotrView.js(Root Component for actor components which display actors page and contains all required operations for each actor add,delete,..etc)
          |--AddActorForm.js(Class Component represents Add form for actors)
          |--Actor.js(Functional Component which represents each actor information)
             |--UpdateActorForm.js (Class Component which represents update form information for each actor)
             |--ViewMovies.js (Class Component which represents movies for each actor)

        |--MovieView.js(Root Component for movie components which display movie page and contains all required opretaions for each movie add,delete,..etc)
          |--AddMovieForm.js(Class Component represents Add form for movies)
          |--Movie.js(Functional Components which represents each movie information)
             |--UpdateMovieForm.js(Class Compnent which represents update form information for each movie)
             |--ViewActors.js(Class Component which actors for each movie)



