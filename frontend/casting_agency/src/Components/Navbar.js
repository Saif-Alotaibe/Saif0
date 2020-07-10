import React  from "react"
import {NavLink} from "react-router-dom"


function buildlink(domain,clientId,audiance,callBack) {
    return "https://"+domain+"/authorize?audience="+audiance+"&response_type=token&client_id="+clientId+"&redirect_uri="+callBack
 }
//Update the following variabels to yours
var domain = "fsndud.auth0.com"
var clientId="SsjxABmOI43mW3D5zApDgnkjlLkCE0Xg"
var audiance = "Casting_Agency_Api"
var callBack = "http://localhost:3000/"
var link = buildlink(domain,clientId,audiance,callBack)



const Navbar = ({parseJwt,isValidToken,can}) => {

    
   let jwt = parseJwt(localStorage.getItem("JWT"))
    var Validtoken=true
    if( jwt!==null && !isValidToken(jwt)){
        localStorage.removeItem("JWT")
      
        Validtoken=false
    }

    var CanViewMovies = can("get:movies",jwt)
    var CanViewActors = can("get:actors",jwt)
    
   

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="#">Saif0</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
                <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
               {CanViewMovies?<NavLink className="nav-link" to="/Movies">Movies</NavLink>:null} 
            </li>
            <li className="nav-item">
              {CanViewActors?<NavLink className="nav-link" to="/Actors">Actors</NavLink>:null}  
            </li> 
            <li className="nav-item">

                {localStorage.getItem("JWT")!==null && Validtoken?(<button className="btn btn-primary" onClick={()=>{localStorage.removeItem("JWT")
                window.location.href="http://localhost:3000/"}}>Logout</button>)
                :(<button className="btn btn-primary" onClick={()=>{window.location.href=link}}>Login</button>)}
                
            </li>     
            
            
            </ul>
            
        </div>
        </nav>
    )



}

export default Navbar;