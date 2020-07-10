import React , {Component} from "react"




class Home extends Component{

    state = {
        jwt:localStorage.getItem("JWT")||null
    }
    render(){
      return  this.state.jwt!=null ? (
          <div className="container mt-3">
              <h1 className="Custom-text ">Saif0</h1>
              <p className="Custom-text">Casting Agency with more than 10+ movies! and best actors</p>
              <h3 className="Custom-text">You are logged in and your Access Token:</h3>
                 <p className="Custom-text">{this.state.jwt}</p>
          </div>
      ) : (
        <div className="container  mt-3">
        <h1 className="Custom-text ">Saif0</h1>
        <p className="Custom-text">Casting Agency with more than 10+ movies! and best actors</p>
        <h3 className="Custom-text">Please Login to Access All functionality</h3>
           
    </div>
      )
    }





}


export default Home;