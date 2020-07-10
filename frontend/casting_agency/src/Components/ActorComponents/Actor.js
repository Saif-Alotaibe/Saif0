import React from "react"
import UpdateForm from "./UpdateActorForm"
import ViewMovies from "./ViewMovies"
const Actor = ({actors,handleDelete,handleUpdate,getAllMovies,uuid,can,parseJwt}) =>{

    let jwt = parseJwt(localStorage.getItem("JWT"))
    let CanUpdate = can("patch:actor",jwt)
    let CanDelete = can("delete:actor",jwt)
  

   async function getActorMovies(id) {

     var response1 = await  fetch("https://saif0.herokuapp.com/actors/"+id+"/movies",{ method:"GET" ,
    headers:{
        "Authorization":"Bearer "+localStorage.getItem("JWT")
    }
})
     var json1 = await response1.json()

     return {
         actorMovies :json1.movies
     }
}
    

    const newActors = actors.map(actor =>{
        return (
            <div key={actor.id} className="col-md-3" >
            <div className="card text-white text-center bg-dark mb-3">
                <div className="card-body">
                    <h5 className="card-title">{actor.name}</h5>
                    <p className="card-text">Age:{actor.age}</p>

                    <p className="card-text">Gender:{actor.gender.localeCompare("M")===0 ? "Male":"Female"}</p>
                   {CanDelete? <button className="btn btn-danger " onClick={()=>handleDelete(actor.id,actor.name)} >Delete</button>
                   :null}

                    {CanUpdate?<button className="btn btn-primary ml-2" data-toggle="modal" data-target={"#ActorModal"+actor.id}>Update</button>
                    :null}

                    {/*  Start Update Modal */}
                    <div className="modal fade" key={actor.id} id={"ActorModal"+actor.id} tabIndex="-1" role="dialog" aria-labelledby={"exampleModalLabel"+actor.id} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"exampleModalLabel"+actor.id}>Update Actor</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                         <UpdateForm gender={actor.gender} uuid={uuid}
                          getActorMovies={getActorMovies} getAllMovies={getAllMovies} age={actor.age}
                           id={actor.id} name={actor.name} handleUpdate={handleUpdate}
                           
                           />
                        </div>
                        
                        </div>
                    </div>
                    </div>
                    {/* end of update*/}
                    
                </div>
                {/* Start of view Movies modal*/}
                <button className="btn btn-info" data-toggle="modal" data-target={"#ViewMovies"+actor.id}>View Movies</button>
                <div className="modal fade" key={actor.id+1} id={"ViewMovies"+actor.id} tabIndex="-1" role="dialog" aria-labelledby={"exampleModalLabel"+actor.id} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"exampleModalLabel"+actor.id}>Actor Movies</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <ViewMovies getActorMovies={getActorMovies} id={actor.id} uuid={uuid}/>
                           
                        </div>
                        
                        </div>
                    </div>
                    </div>
                     {/* End of View Movies modal*/}
                </div>
             </div>
        )
    })
    return(
        <div className="row mt-3">
            
            {newActors}
        </div>
    )
}


export default Actor;