import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Login = ({setLoginStatus}) => {
        
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const details = {
            email: email,
            password: password
        };

        let buyer = true;
        let vendor_buyer = true; 
        console.log(buyer );
        axios
      .post("http://localhost:4000/buyer/login", details)
        
            
          
        
      .then((response) => {

        console.log(response.data.status);
        console.log(response.status);
        if (response.data.status === "success") {
        /*if (response.data.status === "success") 
        {*/
          //("/register");
          alert(response.data.message);
          console.log(response.data);
          setLoginStatus(true);
          localStorage.clear();
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("password", response.data.user.password);
          localStorage.setItem("ID", response.data.user._id);
          localStorage.setItem("loginStatus", "true");
          //navigate to profile
          navigate("/buyer/profile");
        /* }*/
        }
         if(response.data.status === "Buyer not found")
        {
          axios
        .post("http://localhost:4000/vendor/login", details)
        .then((responsee) => {
          if(responsee.data.status === "Vendor not found") {
            alert("Wrong Credentials");
            }
          else{
          alert(responsee.data.message);
          console.log(responsee.data);
          setLoginStatus(true);
          localStorage.clear();
          localStorage.setItem("email", responsee.data.user.email);
          localStorage.setItem("password", responsee.data.user.password);
          localStorage.setItem("ID", responsee.data.user._id);
          localStorage.setItem("loginStatus", "true");
          localStorage.setItem("shopName",responsee.data.user.shopName);
          //navigate to profile
          navigate("/vendor/profile");
          vendor_buyer = false;
          }
        })
      }
      
        /*.catch(function (error) {
          console.log(error);
          vendor_buyer=false;
          
          //alert("No User Found");
        }); /*
      }
       /* }*/
        //alert(response.data);
        //console.log(response.data);
        //navigate to profile
        
      })

      /*.catch(function (error) {
        console.log(buyer);  
        buyer=false;


      });*/
      
     /* if (buyer === false) {
        console.log(buyer);
        axios
        .post("http://localhost:4000/vendor/login", details)
        .then((response) => {
          alert(response.data);
          console.log(response.data);
          //navigate to profile
          navigate("/register");
        })
        .catch(function (error) {
          console.log(error);
          vendor_buyer=false;
  
  
        }); 

        if (vendor_buyer===false) {
          alert("No User Found"); 
        }
      }*/

    //resetInputs();
    };

    return (
        <Grid container align={"center"} Spacing={2} >
             <Grid item xs={12} class="grid-container">
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
        
        </Grid>

        <Grid item xs={12} class="grid-container">
            <TextField

              label="Password"
              variant="outlined"
              value={password}
              onChange={onChangePassword}
            />
            </Grid>

            <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    
        </Grid>

        
    )
};

export default Login;