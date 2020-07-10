import React from 'react';
import Navbar from "./Components/Navbar"
import {BrowserRouter as Router , Route } from "react-router-dom"

//Components 
import MovieView from "./Components/MovieComponents/MovieView"
import ActorView from './Components/ActorComponents/ActorView';
import Home from "./Components/Home"
import Footer from "./Components/Footer"

function App() {
 

  function parseJwt (token) {
    if(token===null)
    return null
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  function isValidToken(token){
     let currentTime= ~~(Date.now().valueOf()/1000)

    if(token.exp <currentTime)
      return false
    else
      return true
  } 

  function can(permission,token){
    if(token===null)
      return false;
    else{
      var Can=false
      for(let i=0;i<token.permissions.length;i++){
          if(token.permissions[i].localeCompare(permission)===0)
          Can=true
      }
      return Can;
    }  
  }


  const fragment= window.location.hash.substr(1).split('&')[0].split('=');
  if (fragment[0]==="access_token"){
      localStorage.setItem("JWT",fragment[1]);
  }
  
 
  
  
  return (
    <div className="background-img">
      <Router>
      <Navbar  parseJwt={parseJwt} isValidToken={isValidToken} can={can}/>
      <Route exact path="/" component={Home} />
      <Route path="/Movies" component={()=> <MovieView parseJwt={parseJwt} can={can} />} />
      <Route path="/Actors" component={()=> <ActorView parseJwt={parseJwt} can={can} />} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
