import React  from "react";
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { grid } from "@mui/system";



const ProfileV = () => {
    const [ID, setID] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [mname, setMname] = useState("");
    const [shopName, setShopname] = useState("");
    const [location, setLocation] = useState("");
    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");
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

    const onChangeMname = (event) => {
        setMname(event.target.value);
    }

    const onChangeShopname = (event) => {
        setShopname(event.target.value);
    }

    const onChangeLocation = (event) => {
        setLocation(event.target.value);
    }

    const onChangeOpeningTime = (event) => {
        setOpeningTime(event.target.value);
    }

    const onChangeClosingTime = (event) => {
        setClosingTime(event.target.value);
    }



    if(flag === false){
    axios
    .post("http://localhost:4000/vendor/login", {
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
        setMname(response.data.user.mname);
        setShopname(response.data.user.shopName);
        setLocation(response.data.user.location);

        setOpeningTime(response.data.user.openingTime);
        setClosingTime(response.data.user.closingTime);

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
        .put("http://localhost:4000/vendor/update/"+ID, {
            password: password,
            phone: phone,
            mname: mname,
            shopName: shopName,
            location: location,
            openingTime: openingTime,
            closingTime: closingTime

        })


    }
    return (
        <Grid container align={"center"} Spacing={2} >
     
      <Grid item xs={12} class="grid-container">
        <TextField
          label="Managers Name"
          variant="outlined"
          value={mname}
          onChange={onChangeMname}
        />
      </Grid>
      <Grid item xs={12} class="grid-container">
        <TextField
          label="Shop Name"
          variant="outlined"
          value={shopName}
          onChange={onChangeShopname}
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

          label="Phone"
          variant="outlined"
          value={phone}
          onChange={onChangePhone}
        />
        </Grid>

          <Grid item xs={12} class="grid-container">
        <TextField
          label="Opening Time"
          variant="outlined"
          value={openingTime}
          onChange={onChangeOpeningTime}
        />
        </Grid>

        <Grid item xs={12} class="grid-container">
        <TextField
          label="Closing Time"
          variant="outlined"
          value={closingTime}
          onChange={onChangeClosingTime}
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
        <Button variant="contained" onClick={updateProfile}>
          Register
        </Button>
      </Grid>
    </Grid>
    )
}

export default ProfileV;