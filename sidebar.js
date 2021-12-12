import react , {Component} from "react";
import "./side.css";
import {Sidebardata} from "./sidebardata.js";
import axios from 'axios';
import Logo from './Logo.png';



const inp = {
    width:'450px',
    backgroundColor:'#ffece7',
    border:'#f5d7cf'
    
}
const btn = {
    backgroundColor:'#e48065'
}
const txt = {
    color:'#757a7e'
}
const bor = {
    //border:'#f5d8db'
    border:'#f5d7cf'
}
const bac = {
    backgroundColor:'Blue'
}
class Sidebar extends Component{
    constructor(){
        super();
        this.state ={
            userlist:[],
            formdata:{},
            errorArray:{},
            message:''
        }
    }
    processInput = (obj) =>{
        let formdata = this.state.formdata;
        formdata[obj.target.name] = obj.target.value;
    // formdata[fname] ="Ramesh";
    // formdata[mobile] =999999999999
    // formdata[email] ="Ramesh@gmail";
        this.setState({
            formdata
        })
    }
    getUser = () => {
        
    //fetch("http://3.129.92.172:5000/viewUsers")
    fetch("https://www.weatherapi.com/docs/conditions.json")
    .then(res => res.json())
    .then(data=>this.setState({
        userlist:data
    }));
    //.then(data=>console.log(data))
    }
    save = (formObj) =>{
        formObj.preventDefault(); // after button click prevent from page re-load
        let formStatus = true;
        //validation start here 
        let error={};
         if( !this.state.formdata["fname"] ){
            formStatus=false;
            error["nameError"] = "Enter Your Name";
         }else{
            error["nameError"] = "";
         }
         //email validation
         if( !this.state.formdata["femail"] ){
            formStatus=false;
            error["emailerror"] = "Enter Your email";
         }else{
            error["emailerror"] = "";
         }
         //password validation 
         if( !this.state.formdata["fpassword"] ){
            formStatus=false;
            error["passworderror"] = "Enter Your password";
         }else{
            error["passworderror"] = "";
         }
         //confirmp validation 
         if( !this.state.formdata["confirmp"] ){
            formStatus=false;
            error["confirmpassworderror"] = "Enter Your confirm password";
         }else{
            error["confirmpassworderror"] = "";
         }

         this.setState({
             errorArray:error
         })

        if(formStatus==true){
            let url = "http://3.129.92.172:5000/registration";
            let jsonData = JSON.stringify(this.state.formdata); // array to json 
            axios.post(url , jsonData).then(response=>{
                this.setState({
                    message:response.data
                })
                this.getUser();// TO RELOAD THE LIST
                formObj.target.reset();// to clear the form 
            })
        }
    }

    componentDidMount(){
        this.getUser();
    }
    render(){
        return(
            <div className="container mt-3">
                <div className="row">
                    
                    <div className="col-lg-2">
                    <img src={Logo} style={bac} />
                    </div>
                    <div className="col-lg-10">

                    </div>

                </div>
              <div className="row">
                <div className="col-lg-2">
                <div className="side">
                
            <ul className="sidebarlist">
            {Sidebardata.map((val,key)=>{
            return(
                <li key={key}
                className="row" 
                onClick={()=>{window.location.pathname = val.link}}>
                    <div>{val.icon}</div>
                </li>)
        })}
        </ul>
             </div>
                </div>
                <div className="col-lg-10">
                    <div className="row">
                        <div className="col-lg-6">
                       <span className=" p-2 m-4">Users</span>
                       </div>
                       <div className="col-lg-4 text-end">
                       <span className=" back ">Number of users {this.state.userlist.length}</span></div>
                       <div className="col-lg-2 input-group-append">
                                <button 
                                    className="input-group-text btn btn-primary btn-lg" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#addnew" >
                                     <i className="fas fa-user-plus"></i>
                                Adduser</button>
                        </div>
                       
                    </div>
                       

                       <table className="table table-bordered">
                           <thead>
                               <tr className="">
                                   <th>Email-address</th>
                                   <th>Name</th>
                                   <th>Created on</th>
                                   <th>Role</th>
                                   <th>Status</th>
                                   <th>Actions</th>

                               </tr>
                           </thead>
                           <tbody>
                               {
                                   this.state.userlist.map((userinfo , index)=>{
                                       return(
                                           <tr key={index}>
                                               <td>{userinfo.code}</td>
                                               <td>{userinfo.day}</td>
                                               <td>{userinfo.createdDt}</td>
                                               <td>{userinfo._id}</td>
                                               <td>{userinfo.isActive}</td>
                                               <td>{userinfo.__v}</td>
                                           </tr>
                                       )
                                   })
                               }
                                
                           </tbody>

                       </table>

                </div>
            </div>
            <div className="modal fade" id="addnew" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel" style={txt}>Add User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
          <div className="row" style={txt} style={bor}>
              <div className="col-lg-6 p-1">
              <input type="text" placeholder="Name" name="fname" onChange={this.processInput}></input>
              <small className="text-danger">
                                    {this.state.errorArray.nameError}
                </small>
              </div>
              <div className="col-lg-6 p-1">
              <input type="email"  placeholder="Email Address" name="femail" onChange={this.processInput}></input>
              <small className="text-danger">
                    {this.state.errorArray.emailerror}
                </small>
              </div>
              <div className="col-lg-6 p-1">
              <input type="password" placeholder="password" name="fpassword" onChange={this.processInput}></input>
              <small className="text-danger">
                    {this.state.errorArray.passworderror}
                </small>
              </div>
              <div className="col-lg-6 p-1">
              <input type="password" placeholder="Confirm Password" name="fconfirmp" onChange={this.processInput}></input>
              <small className="text-danger">
                        {this.state.errorArray.confirmpassworderror}
                </small>
              </div>

              
            </div>
            <div className="row">
                <div className="col-lg-12 mt-1">
                    <input type="text" placeholder="incorrect username or password                                           x" style={inp} ></input>
                    
                </div>

            </div>
        
      </div>
      <div className="modal-footer justify-content-start">
        
        <button type="button" style={btn} className="btn btn-primary" onClick={this.save}>Adduser</button>
      </div>
    </div>
  </div>
</div>
        </div>
        )
    }
    
}
export default Sidebar;