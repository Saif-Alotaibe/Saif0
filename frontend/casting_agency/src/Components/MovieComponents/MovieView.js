import React,{Component} from "react"
import $ from "jquery"
import Movie from "./Movie"
import AddForm from "./AddMovieForm"
class MovieView extends Component {

   
    state= {
        movies:[
           
    ],
        pageNum:1,
        numberOfMovies:null
    }
    componentDidMount(){
        this.getMovies()
    }

    getMovies = () => {
        
    fetch('https://saif0.herokuapp.com/movies?page='+this.state.pageNum,
    {method:"GET",
    headers:{
        "Authorization":"Bearer "+localStorage.getItem("JWT")
    }
    }
    )
    .then(response => response.json())
    .then(data => 
       this.setState({
           movies:data.movies,
           numberOfMovies:data.number_of_movies
           
       })
    );
    }
    
    handleClick = (pageNumber)=>{
      
        
        this.setState({pageNum:pageNumber},()=>{
            this.getMovies()
        })
      
        
    }

    handleDelete = (id,movieName) =>{
        let wantToDelete= window.confirm("Are you want to delete Movie:"+movieName)
        if(wantToDelete){
            fetch("https://saif0.herokuapp.com/movies/"+id,{
                method:"delete",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("JWT")
                }
            }).then(response => response.json())
            .then(data =>{
              this.getMovies()
            })
        }

    }
    
    handleAdd = (e,title,year,month,day) =>{
        e.preventDefault()
        const dateString = year +"-"+month+"-"+day
     
        fetch("https://saif0.herokuapp.com/movies",{
            method:"POST",
            body:JSON.stringify({
                "title":title,
                "release_date":dateString
            }),
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
        }).then(response => response.json())
        .then(()=>{
            $("#AddMovieModal .close").click();
        }).then(()=>{this.getMovies()})
        
    }    
    
    handleUpdate = (e,id,title,year,month,day) =>{
        e.preventDefault()
        const dateString = year +"-"+month+"-"+day
        fetch('https://saif0.herokuapp.com/movies/' + id , {
            method: 'PATCH',
            body: JSON.stringify({
              'title': title,
              "release_date":dateString
            }),
            headers: {
              'Content-Type': 'application/json',
              "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
          }).then(response => response.json())
         .then(()=>{
              $("#MovieModal"+id +" .close").click();
          }).then(()=>{
              this.getMovies()
          })
        
    }    
    render(){

        const{can,parseJwt,keys} = this.props
        let jwt = parseJwt(localStorage.getItem("JWT"))
        let CanAdd = can("post:movie",jwt)
     
        var paginationArr = Array(Math.ceil(this.state.numberOfMovies/4))
            for(let i=0;i<paginationArr.length;i++)
                paginationArr[i] = i+1;
            
            const PaginationJSX = paginationArr.map(pageNumber=>{
            return <li key={pageNumber} className="page-item"><i className="page-link" onClick={()=>this.handleClick(pageNumber)}>{pageNumber}</i></li>
            })

        
        return(
            <div>
               
                <div className="container mt-2">
                                    
                    {CanAdd?<button type="button" className="btn btn-dark Custom-btn" data-toggle="modal" data-target="#AddMovieModal">
                    Add Movie
                    </button>:null}

                    {/* Start of Add modal */}
                    <div className="modal fade" id="AddMovieModal" tabIndex="-1" role="dialog" aria-labelledby="AddMovieLable" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-white text-center">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AddMovieLable">Add Movie</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <AddForm handleAdd={this.handleAdd} keys={keys}/>
                        </div>
                       
                        </div>
                    </div>
                    </div>
                    {/* End of Add Modal */}
                        <Movie   
                        keys={keys}
                        movies={this.state.movies} 
                        handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}
                         can={can} parseJwt={parseJwt}/>
                    <nav aria-label="..." className="CustomPagination">
                        <ul className="pagination pagination-sm ">
                        {PaginationJSX}
                        </ul>
                    </nav>    
                </div>
                
            </div>
        )
    }

}


export default MovieView;