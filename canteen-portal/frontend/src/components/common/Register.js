import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { grid } from "@mui/system";

const users = [
  {
    value: 'vendor',
    label: 'vendor',
  },
  {
    value: 'buyer',
    label: 'buyer',
  },

];

let vendor = true;

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);
  const [user, setUser] = useState("Vendor");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  //for user:vendor
  const [mname, setmName] = useState("");
  const [shopName, setshopName] = useState("");
  const [location, setLocation] = useState("");
  const [upiID, setUpiID] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [openingTime, setOpeningTime] = useState("");

  //for user:buyer
  
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");



  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeUser = (event) => {
    setUser(event.target.value);  // event.target.value is the value of the selected option 
    if (event.target.value === "vendor") {
        vendor = true;
    }
    else {
        vendor = false;
      
    }
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  
  const onChangeUpiID = (event) => {    
    setUpiID(event.target.value);
  };

  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const onChangemname = (event) => {
    setmName(event.target.value);
  };

  const onChangeshopName = (event) => {
    setshopName(event.target.value);
  };

  const onChangeclosingTime = (event) => {
    setClosingTime(event.target.value);
  };

  const onChangeopeningTime = (event) => {
    setOpeningTime(event.target.value);
  };

  const onChangeage = (event) => {
    setAge(event.target.value);
  };

  const onChangebatch = (event) => {
    setBatch(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setDate(null);
    setUser("Vendor");
    setPassword("");
    setLocation("");
    setUpiID("");
    setPhone("");
    setmName("");
    setshopName("");
    setClosingTime("");
    setOpeningTime("");
    setAge("");
    setBatch("");


  };

  const onSubmit = (event) => {
    event.preventDefault();

    let newUser = {
      name: name,
      email: email,
      date: Date.now(),
      
    };
    console.log(vendor);
    if (vendor===true) {
      const newVendor = {
        mname: mname,
        date: Date.now,
        shopName: shopName,
        email: email,
        phone: phone,
        openingTime: openingTime,
        closingTime: closingTime,
        password: password


        
        
        
        
        
        
        
        
        

        
      };

      
      axios
      .post("http://localhost:4000/vendor/register", newVendor)
      .then((response) => {
        alert("Created");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Incorrect Input Format");
      });
    


      resetInputs();
    }  
    else
    {
      newUser = {
        name: name,
        email: email,
        date: Date.now,
        age: age,
        batch: batch,
        password: password,
        phone: phone
        
      };
      

      axios
      .post("http://localhost:4000/buyer/register", newUser)
      .then((response) => {
        alert("Created");
        console.log(response.data);
      })
      
      .catch((error) => {
        console.log(error);

        alert("Incorrect Input Format");
      });


      resetInputs();
      
    
    }

    
    
  };


  if(vendor) {
  return (
    <Grid container align={"center"} Spacing={2} >
      <Grid item xs={12} class="grid-container">
          <TextField
            select
            label="User"
            variant="outlined"
            value={user}
            onChange={onChangeUser}
            SelectProps={{
              native: true,
            }}> 
            {users.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
            
          ))}

          </TextField>
          
          </Grid>
      <Grid item xs={12} class="grid-container">
        <TextField
          label="Managers Name"
          variant="outlined"
          value={mname}
          onChange={onChangemname}
        />
      </Grid>
      <Grid item xs={12} class="grid-container">
        <TextField
          label="Shop Name"
          variant="outlined"
          value={shopName}
          onChange={onChangeshopName}
        />
      </Grid>

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
          onChange={onChangeopeningTime}
        />
        </Grid>

        <Grid item xs={12} class="grid-container">
        <TextField
          label="Closing Time"
          variant="outlined"
          value={closingTime}
          onChange={onChangeclosingTime}
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
  );
            }
  else{
    return (
      <Grid container align={"center"} Spacing={2} >
      <Grid item xs={12} class="grid-container">
          <TextField
            select
            label="User"
            variant="outlined"
            value={user}
            onChange={onChangeUser}
            SelectProps={{
              native: true,
            }}> 
            {users.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
            
          ))}

          </TextField>

          </Grid>
      
      <Grid item xs={12} class="grid-container">
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      
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
          onChange={onChangeage}
        />
        </Grid>
        <Grid item xs={12} class="grid-container">
        <TextField
          label="Batch"
          variant="outlined"
          value={batch}
          onChange={onChangebatch}
        />
        </Grid>

              
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
    )
  }
          ;
};

export default Register;
