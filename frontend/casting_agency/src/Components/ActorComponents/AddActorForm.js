import React,{Component} from "react"





class AddActorForm extends Component {


    state = {
        name:null,
        age:15,
        gender:"M",
        movies:[],
        actorMovies:[]
    }

    componentDidMount(){
        let {getAllMovies}= this.props

        getAllMovies().then(data=>{
            this.setState({movies:data.movies})
        })
    }

    handleChange = (e) =>{
        
        
        if(e.target.name.localeCompare("actorMovies")!==0)
             this.setState({
            [e.target.name]:e.target.value
                })
        else {

            this.setState({
                actorMovies:e.target.options
            })
        }
            
            
    }

    render(){
        const{handleAdd} = this.props
        var Movies = this.state.movies
        
        
        var Ages = []
        const Genders= ['M','F']
        var count=0;


        for (let i=15;i<70;i++){
            Ages[count] = i
            count++
        }
            
        const AgeOptions  = Ages.map( (Age,index) =>{
        return  ( <option  key ={index} value={Age} >{Age}</option>) 
       
        })

        const GenderOptions = Genders.map( (Gender,index) =>{
         return ( <option key={index} value={Gender}>{Gender.localeCompare("M")===0?"Male":"Female"}</option>)
        })
        
        
        const MoviesOptions = Movies.map((movie,index)=>{
        return (<option key={index} value={movie.id}>{movie.title}</option>)
        })

        return( 
            <form id="AddForm" onSubmit={e=>handleAdd(e,this.state.name,this.state.age,this.state.gender
            ,this.state.actorMovies)} >
                <h6><span className="label label-default">Name </span></h6> 
                <input type="text" name="name" required onChange={this.handleChange}/>
                <h6><span className="label label-default">Age </span></h6> 
                <select className="custom-select" name="age" onChange={this.handleChange} >
                    {AgeOptions}
                </select>
                <h6><span className="label label-default">Gender </span></h6> 
                <select className="custom-select" name="gender" onChange={this.handleChange} >
                    {GenderOptions}
                </select>
                <h6><span className="label label-default">Actor Movie(s) (CTRL+click to multiple select) </span></h6> 
                <select className="custom-select" required multiple name="actorMovies" onChange={this.handleChange}>
                    {MoviesOptions}
                </select>

                <div className="modal-footer">
                            <button type="button" className="btn btn-secondary " data-dismiss="modal">Close</button>
                            <button  className="btn btn-primary" >Add</button>
                        </div>
            </form>
        )
    }
}



export default AddActorForm;