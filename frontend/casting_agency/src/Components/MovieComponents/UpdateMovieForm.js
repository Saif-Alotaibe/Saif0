import React , {Component} from "react"


class UpdateForm extends Component {


    state = {
        title:null,
        year:null,
        month:null,
        day:null

    }

    componentDidMount(){
        let {release_date,title} = this.props
        let initialYear = parseInt(release_date.substr(0,4))
        let initialMonth =release_date.substring(5,7)
        let initialDay = release_date.substring(8,11)
        let initialTitle = title
        this.setState({
            title:initialTitle,
            year:initialYear,
            month:initialMonth,
            day:initialDay
        })
    }
    handleChange = (e) => {
        
        this.setState(
            {
                [e.target.name]:e.target.value
            } 
        )
        
        
    }
    render(){

        var Days=[]
        const{release_date,id,title,handleUpdate} = this.props
        const Months =['01','02','03','04','05','06','07','08','09','10','11','12']
        const Day = release_date.substring(8,11)
        const year= parseInt(release_date.substr(0,4))
        const Month = release_date.substring(5,7)
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
 
         var DaysOptions = Days.map((day,index) =>{
         return (<option key={index}  value={day}>{day}</option>)
         })

       
       
         
       
        
        const MontsOptions = Months.map((month,index) =>{
            
            
        return (<option key={index} value={month}>{month}</option>)
        })

        
       
   
        const YearsOptions = Years.map( (Year,index )=>{
        return (
            <option   key={index} value={Year}>{Year}</option>
        )
        })

       

        return(
            <form key={id} onSubmit={ e=>handleUpdate(e,id,this.state.title,this.state.year,
            this.state.month,this.state.day)} >
                <h6><span className="label label-default">Title </span></h6> 
               <input type="text" defaultValue={title} name="title"className="mb-2" onChange={this.handleChange}/>
               <h6><span className="label label-default">Year </span></h6>
               <select className="custom-select mb-2" name="year" onChange={this.handleChange} defaultValue={year}>
               {YearsOptions}
               </select>
               
               <h6><span className="label label-default">Month </span></h6>
               <select className="custom-select mb-2" name="month" onChange={this.handleChange} defaultValue={Month} >
                   {MontsOptions}
               </select>
               <h6><span className="label label-default">Day </span></h6>
               <select className="custom-select mb-2" name="day" onChange={this.handleChange} defaultValue={Day}>
                   {DaysOptions}
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