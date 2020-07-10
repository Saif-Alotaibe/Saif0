import React from "react"

import UpdateForm from "./UpdateMovieForm"
import ViewActors from "./ViewActors"
const Movie = ({movies,handleDelete,handleUpdate,can,parseJwt}) => {

  let jwt = parseJwt(localStorage.getItem("JWT"))
  let CanDelete = can("delete:movie",jwt)
  let CanUpdate = can("patch:movie",jwt)
       
   
        
 
    const  MovieUI = movies.map(movie => {
        return(
            
        <div key={movie.id} className="col-md-3" >
            <div className="card text-white text-center bg-dark mb-3">
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">Release Date:{movie.release_date}</p>
                    {CanDelete?<button className="btn btn-danger mb-2" onClick={()=>handleDelete(movie.id,movie.title)}>Delete</button>
                    :null}
                    {CanUpdate?<button type="button" className="btn btn-primary ml-2 mb-2" data-toggle="modal" data-target={"#MovieModal"+movie.id}>Update</button>
                    :null}
                    {/* Start Update Modal */}
                    <div className="modal fade" key={movie.id} id={"MovieModal"+movie.id} tabIndex="-1" role="dialog" aria-labelledby={"exampleModalLabel"+movie.id} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"exampleModalLabel"+movie.id}>Update Movie</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                         <UpdateForm  release_date={movie.release_date} id={movie.id} title={movie.title} handleUpdate={handleUpdate}/>
                        </div>
                        
                        </div>
                    </div>
                    </div>

                    {/* End of Update Modal */}
                </div>
                <button className="btn btn-info" data-toggle="modal" data-target={"#ViewActors"+movie.id}>View Actors</button>
                <div className="modal fade" key={movie.id+1} id={"ViewActors"+movie.id} tabIndex="-1" role="dialog" aria-labelledby={"exampleModalLabel"+movie.id} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"exampleModalLabel"+movie.id}>Movie Actors</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                       <ViewActors id={movie.id}/>
                           
                        </div>
                        
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        )
    })
    return (
        <div className="row mt-3">
            {MovieUI}
        </div>
        )
}
    
    

       
 
export default Movie;