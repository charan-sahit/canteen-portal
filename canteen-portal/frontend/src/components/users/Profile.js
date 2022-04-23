/*import axios from "axios";
import { useState, useEffect } from "react";

const Profile = (props) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/profile") // unimplemented
      .then((response) => {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return <div></div>;
};

export default Profile;*/

//SECOND CODE

/*import axios from 'axios';
import React, {useState} from 'react';
import Button from "@mui/material/Button";







const Profile = () => {
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let Name = "smtg";
    const [NAME, setNAME] = useState("");
    const [ID, setID] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

    }

    axios
    .post("http://localhost:4000/buyer/login", {
        email: email,
        password: password
        })
    .then((response) => {
        Name = response.data.user.name;
        console.log(response.data.user);
        console.log(Name);
        setNAME(Name);
        setID(response.data.user.id);
        let phone = response.data.user.phone;
        let age = response.data.user.age;
        let batch = response.data.user.batch;
    })
    console.log(Name);
    return (
        <div>
        <h1>Profile</h1>
        
        <table>
            <tr>
                <th>Details</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Name</td>
                <td>{NAME}</td>
                <td>
                  <Button variant="contained" onClick={onSubmit}>
                    Update
                  </Button>

                </td>
            </tr>
            </table>
        </div>
        
    );
    }

    export default Profile;
*/


import React  from "react";
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { grid } from "@mui/system";

const Profile = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");
    const [flag, setFlag] = useState(false);



    /*const onChangeUsername = (event) => {
        setName(event.target.value);
    }*/

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

    let Email = localStorage.getItem("email");
    let Password = localStorage.getItem("password");
    
    console.log(Email);
    console.log(Password);

    if(flag===false){
    axios
    .post("http://localhost:4000/buyer/login", {
        email: Email,
        Password: Password
        })

    .then((response) => {
        console.log(response.data.user);
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
        name: name,
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
