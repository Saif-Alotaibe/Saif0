import React , {Component} from "react"





class AddForm extends Component{
    state = {
        title:null,
        year:1800,
        month:1,
        day:1
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        const{handleAdd} = this.props

        var Days=[]
        const Months =['01','02','03','04','05','06','07','08','09','10','11','12']
        const Years =[]
        var count = 0;
    
        for(var i=1800;i<2200;i++){
            Years[count] = i;
            count++;
        } 
 
         for(let i=0;i<30;i++){
             if(i <10 && (i+1)<10)
             Days[i]="0"+(i+1)
             else
             Days[i] = ""+(i+1)+""
         }
 
         var DaysOptions = Days.map( (day,index) =>{
         return (<option key={index} value={day}>{day}</option>)
         })

        const MontsOptions = Months.map((month,index) =>{
        return (<option key={index} value={month}>{month}</option>)
        })

        const YearsOptions = Years.map((Year,index)=>{
        return (<option key={index} value={Year}>{Year}</option>)
        })

        return(
            <form onSubmit={ e=>handleAdd(e,this.state.title,this.state.year,
                this.state.month,this.state.day)} >
                 <h6><span className="label label-default">Title </span></h6> 
               <input type="text"  name="title"className="mb-2" onChange={this.handleChange} required/>
               <h6><span className="label label-default">Year </span></h6>
               <select className="custom-select mb-2" name="year" onChange={this.handleChange} >
               {YearsOptions}
               </select>
               
               <h6><span className="label label-default">Month </span></h6>
               <select className="custom-select mb-2" name="month" onChange={this.handleChange} >
                   {MontsOptions}
               </select>
               <h6><span className="label label-default">Day </span></h6>
               <select className="custom-select mb-2" name="day" onChange={this.handleChange}> 
                   {DaysOptions}
               </select>
               <div className="modal-footer">
                            <button type="button" className="btn btn-secondary " data-dismiss="modal">Close</button>
                            <button  className="btn btn-primary" >Add</button>
                        </div>
            </form>
        )
    }
}


export default AddForm ;