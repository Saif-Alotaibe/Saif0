import React,{Component} from "react"
import Actor from "./Actor"
import $ from "jquery"
import AddForm from "./AddActorForm"

class ActorView extends Component {

    state = {
        actors:[],
        number_of_actors:null,
        pageNum:1,
        movies:[]
    }

    componentDidMount(){
        this.getActors()
        
    }

    getActors = () =>{
        fetch("https://saif0.herokuapp.com/actors?page="+this.state.pageNum,{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
        })
        .then(response => response.json())
        .then(data=>
            this.setState({
                actors:data.actors,
                number_of_actors:data.number_of_actors
            })
        )
    }

    

    handleClick = (pageNumber) =>{
        this.setState({pageNum:pageNumber},()=>{
            this.getActors()
        })
    }

    handleDelete = (id,name) =>{
        let wantToDelete= window.confirm("Are you want to delete Movie:"+name)
        if(wantToDelete){
            fetch("https://saif0.herokuapp.com/actors/"+id,{
                method:"delete",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("JWT")
                }
            }).then(response => response.json())
            .then(data =>{
             this.getActors() 
            })
        }
    }

    handleUpdate = (e,id,name,age,gender,movies)=>{
            e.preventDefault()
            let movies_ids =[]
          
            
            for(let i=0;i<movies.length;i++)
                    if(movies[i].selected)
                        movies_ids.push(movies[i].value)
                        
            
            fetch('https://saif0.herokuapp.com/actors/' + id , {
            method: 'PATCH',
            body: JSON.stringify({
              'name': name,
              "age":age,
              "gender":gender,
              "movies_ids":movies_ids
            }),
            headers: {
              'Content-Type': 'application/json',
            "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
          }).then(response => response.json())
          .then(()=>{
              $("#ActorModal"+id +" .close").click();
          }).then(()=>{
              this.getActors()
          })
    }

    handleAdd = (e,name,age,gender,movies) =>{
        e.preventDefault()
        
        let movies_ids =[]
        for(let i=0;i<movies.length;i++)
                if(movies[i].selected)
                   movies_ids.push(movies[i].value)
                   
        
        
        
        fetch('https://saif0.herokuapp.com/actors', {
            method: 'POST',
            body: JSON.stringify({
              'name': name,
              "age":age,
              "gender":gender,
              "movies_ids":movies_ids
            }),
            headers: {
              'Content-Type': 'application/json',
              "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
          }).then(response => response.json())
          .then(data => {
            $("#AddForm").trigger("reset")
          }).then(()=>{
              $("#AddActorModal .close").click();
          }).then(()=>{
              this.getActors()
          })
    }

    
    render(){

        async function getAllMovies() {
            
            const response1= await fetch("https://saif0.herokuapp.com/movies",{
                 method:"GET",
                 headers:{
                    "Authorization":"Bearer "+localStorage.getItem("JWT")
                 }
             })
 
             var json1 = await response1.json() 
                        
             const NumberOfMovies = json1.number_of_movies
             
             let length = Math.ceil(NumberOfMovies/4)
             var Movies =[]
             for(let i=0;i<length;i++){
 
                 var responseN = await fetch("https://saif0.herokuapp.com/movies?page="+(i+1), {method:"GET",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("JWT")
                }
            })
                 var jsonN = await responseN.json()
 
                 for(let j=0;j<jsonN.movies.length;j++)
                         Movies.push(jsonN.movies[j])
 
             }
 
             return {
                 movies:Movies
             }
 
 
    }

        const{can,parseJwt} = this.props
        let jwt = parseJwt(localStorage.getItem("JWT"))
        let CanAdd = can("post:actor",jwt)
         
        var paginationArr = Array(Math.ceil(this.state.number_of_actors/4))
        for(let i=0;i<paginationArr.length;i++)
            paginationArr[i] = i+1;
        
        const PaginationJSX = paginationArr.map(pageNumber=>{
        return <li key={pageNumber} className="page-item"><i className="page-link" onClick={()=>this.handleClick(pageNumber)}>{pageNumber}</i></li>
        })

        return(
            <div className="container mt-2">
                  {CanAdd?<button type="button" className="btn btn-dark Custom-btn " data-toggle="modal" data-target="#AddActorModal">
                    Add Actor
                    </button>:null}

                    {/* Start of Add modal */}
                    <div className="modal fade" id="AddActorModal" tabIndex="-1" role="dialog" aria-labelledby="AddMovieLable" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-white text-center">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddMovieLable">Add Actor</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <AddForm  handleAdd={this.handleAdd} getAllMovies={getAllMovies} />
                        </div>
                       
                        </div>
                    </div>
                    </div>
                    {/* End of Add Modal */}
               <Actor actors={this.state.actors} getAllMovies={getAllMovies} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}
               can={can} parseJwt={parseJwt}/> 
               <nav aria-label="..." className="CustomPagination">
                        <ul className="pagination pagination-sm ">
                        {PaginationJSX}
                        </ul>
                    </nav>    
            </div>
        )
    }
}


export default ActorView;