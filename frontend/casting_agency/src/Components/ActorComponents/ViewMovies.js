import React,{Component} from "react"




class ActorMovies extends Component{

    state = {
        movies:[]
    }

    componentDidMount(){
        const{getActorMovies,id} = this.props
        getActorMovies(id).then(data=>{
            this.setState({movies:data.actorMovies})
        })

    }
    render(){
        
       
        const Movies = this.state.movies
        const ActorMovies = Movies.map( (movie,index)=>{
        return (<h6 key={movie.id +3 *20}>{movie.title}</h6>)
        })
        return(
            <div>
                {ActorMovies}
            </div>
        )
    }
}

export default ActorMovies;