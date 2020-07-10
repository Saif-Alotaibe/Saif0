import React ,{Component} from "react"





class UpdateForm extends Component{

    state ={
        name:null,
        gender:null,
        age:null,
        movies:[],
        actorMovies:[]
    }

    handleChange = (e) =>{
        if(e.target.name.localeCompare("actorMovies")!==0)
             this.setState({
            [e.target.name]:e.target.value
                })
        else 
            this.setState({
                actorMovies:e.target.options
            })        
    }

    componentDidMount(){
        let {getAllMovies,getActorMovies,id,age,name,gender} = this.props
        //initial state
        this.setState({
            name:name,
            age:age,
            gender:gender
        })
        getAllMovies().then(data=>{
            this.setState({movies:data.movies})
        })
        getActorMovies(id).then(data=>{
            this.setState({actorMovies:data.actorMovies})
        })
    }
    render(){
        const{age,name,gender,id,handleUpdate} =this.props
        var Ages = []
        var Movies= this.state.movies
        var ActorMovies = this.state.actorMovies
        
        
        
        const Genders= ['M','F']
        var count=0;
        for (let i=15;i<70;i++){
            Ages[count] = i
            count++
        }
        
        
        
            
        const AgeOptions  = Ages.map( (Age,index) =>{
        return  (  <option key={index} value={Age} >{Age}</option>) 
      
        })

        const GenderOptions = Genders.map( (Gender,index) =>{
         return ( <option key={index} value={Gender}>{Gender.localeCompare("M")===0?"Male":"Female"}</option>)
        })

        const MoviesOptions = Movies.map( (movie,index)=>{
            let isActorMovie = false
            for(let i=0;i<ActorMovies.length;i++)
                if(ActorMovies[i].id===movie.id){
                    isActorMovie=true
                    break;
                }
            
            return isActorMovie ? (<option key={index+5 *10} selected value={movie.id}>{movie.title}</option>) 
            : (<option  key={index+5 *10} value={movie.id}>{movie.title}</option>)    
                    
        })

        return(
            <form onSubmit={e=>handleUpdate(e,id,this.state.name,this.state.age,this.state.gender
            ,this.state.actorMovies)}>
                <h6><span className="label label-default">Name </span></h6> 
                <input type="text" defaultValue={name} name="name" onChange={this.handleChange} required/>
                <h6><span className="label label-default">Age</span></h6> 
                <select className="custom-select mt-2 mb-2" name="age"onChange={this.handleChange} defaultValue={age}> 
                {AgeOptions}
                </select>
                <h6><span className="label label-default">Gender </span></h6> 
                <select className="custom-select mb-2" name="gender"onChange={this.handleChange} defaultValue={gender}>
                    {GenderOptions}
                </select>
                <h6><span className="label label-default">Acotr Movie(s) (CTRL+click to multiple select) </span></h6> 
                <select className="custom-select mb-2" defaultValue={ActorMovies} name="actorMovies" onChange={this.handleChange} multiple>
                    {MoviesOptions}
                </select>
                <div className="modal-footer">
                            <button type="button" className="btn btn-secondary " data-dismiss="modal">Close</button>
                            <button  className="btn btn-primary" >Update</button>
                        </div>
            </form>

        )
    }
}



export default UpdateForm;