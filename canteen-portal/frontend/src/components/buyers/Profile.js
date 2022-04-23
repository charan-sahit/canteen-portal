import React  from "react";
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { grid } from "@mui/system";



const Profile = () => {
    const [ID, setID] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");
    const [flag, setFlag] = useState(false);

    /*const onChangeUsername = (event) => {
        setName(event.target.value);
    }*/

    
    let Email = localStorage.getItem("email");
    let Password = localStorage.getItem("password");
    

    console.log(Email);
    console.log(Password);
    

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onChangePhone = (event) => {
        setPhone(event.target.value);
    }

    const onChangeAge = (event) => {
        setAge(event.target.value);
    }

    const onChangeBatch = (event) => {
        setBatch(event.target.value);
    }

    if(flag === false){
    axios
    .post("http://localhost:4000/buyer/login", {
        email: Email,
        password: Password
        })

    .then((response) => {
        console.log(response.data.user);
        setID(response.data.user._id);
        console.log(response.data.user.ID);
        setName(response.data.user.name);
        setPassword(response.data.user.password);
        setPhone(response.data.user.phone);
        setAge(response.data.user.age);
        setBatch(response.data.user.batch);
    })
    .catch(function (error) {
        console.log(error);
    }
    );
    setFlag(true);
    }
    
    const updateProfile = (event) => {
        event.preventDefault();
        axios
        .put("http://localhost:4000/buyer/update/"+ID, {
            password: password,
            phone: phone,
            age: age,
            batch: batch

        })


    }
    return (
        <Grid container align={"center"} Spacing={2} >
      
      
      <Grid item xs={12} class="grid-container">
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          //onChange={onChangeUsername}
        />
      </Grid>
      
      <Grid item xs={12} class="grid-container">
        <TextField
          label="Email"
          variant="outlined"
          value={Email}
          
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
       

       <Grid item xs={12} class="grid-container">
        <TextField
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={onChangePhone}
        />
        </Grid>

        <Grid item xs={12} class="grid-container">
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
        />
        </Grid>
        <Grid item xs={12} class="grid-container">
        <TextField
          label="Batch"
          variant="outlined"
          value={batch}
          onChange={onChangeBatch}
        />
        </Grid>

              
      <Grid item xs={12}>
        <Button variant="contained" onClick={updateProfile}>
          Update
        </Button>
      </Grid>
    </Grid>
    )
}

export default Profile;