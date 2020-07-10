import React,{Component} from "react"



class MovieActors extends Component{

    state={
        actors:[]
    }

    getMovieActors = (id) =>{

        fetch("https://saif0.herokuapp.com/movies/"+id+"/actors",{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
        }).then(respons=>respons.json())
        .then(data=>{
            this.setState({
                actors:data.actors
            })
            
        })
    }


    componentDidMount(){
        const{id} = this.props
        this.getMovieActors(id)
    }

    render(){
        
        
        const Actors = this.state.actors

        const MovieActors = Actors.map(actor=>{
        return(<h6 key={actor.id *10}>{actor.name}</h6>)
        })

        return(
            <div>
                {MovieActors.length===0?<h6>No actor(s) for this movie</h6>:MovieActors}
            </div>
        )
    }
}

export default MovieActors;