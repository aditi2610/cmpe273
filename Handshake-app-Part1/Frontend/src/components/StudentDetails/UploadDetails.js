import { Component } from "react";

class UploadDetails extends Component{

    onSubmit=(e)=> {
        //prevent page from refresh
       e.preventDefault();
       console.log("Inside Submit of upload details");
   
   
       //set the with credentials to true
       axios.defaults.withCredentials = true;
       this.props.history.replace('/home');
      
       

   }
    render() {
        return (
            <div>
                 
                <br />
                <div class="container">
                    <form action="http://127.0.0.1:3000/signup" onSubmit={this.onSubmit} method="post">
                        <div style={{ width: '30%' }} class="form-group">
                           Please complete your Profile by updating details.
                        </div>
                        <br />
                        
                        <div style={{ width: '30%' }}>
                            <Link to="/studentBasicDetails">Upload Basic details</Link>
                        </div>
                       
                    </form>
                </div>
            </div>
        )
    }
}