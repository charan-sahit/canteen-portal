import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";


const EditFoodItem = () => {

    const [name, setName] = useState("");
    
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [veg, setVeg] = useState(true);
    const [tags, setTags] = useState([]);
    const [flagg, setFlagg] = useState(false);
    const [foodItem, setFoodItem] = useState([]);

    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let vendorID  = localStorage.getItem("ID");
    let foodItemId = localStorage.getItem("editID");
    console.log(vendorID)
    console.log(foodItemId);

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onChangePrice = (event) => {

        setPrice(event.target.value);
    }

    const onChangeRating = (event) => {
            
            setRating(event.target.value);
        }

    const onChangeVeg = (event) => {
        setVeg(event.target.value);
    }

    const onChangeTags = (event) => {
        //convert the string to array both comma and space separated
        const tagsArray = event.target.value.split(",").map(tag => tag.trim());
        setTags(tagsArray);
        
        
        
    }
    //useEffect(() => {
    if(flagg === false){
        axios
            .get(
                "http://localhost:4000/vendor/foodItem/" + vendorID + "/" + foodItemId)
            .then(response => {
                console.log(response.data);
                setFoodItem(response.data);
                
            })
            .catch(error => {

                console.log(error);
            });
           
            setFlagg(true);
          }
  //}, []);
    console.log(foodItem);
    console.log(name);
    console.log(price);
    const onSubmit = (event) => {
        event.preventDefault();


        //get ID from local storage
        const ID = localStorage.getItem("ID");
        console.log(ID);
        const foodItem = {
            name: name,
            
            price: price,
            rating: rating,
            vendorId: vendorID,
            veg : true
            
            
        };

        

        //make a post request to backend
        axios
        .put("http://localhost:4000/vendor/editFoodItem/"+ vendorID+ "/"+ID, foodItem)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        console.log(foodItem);

        
    }

    return (
        <Grid container align={"center"} Spacing={2} >
           <Grid item xs={12} class="grid-container">
        <TextField
          label="Food Item Name"
          variant="outlined"
          value={name}
          onChange={onChangeName}
        />
      </Grid>
      <Grid item xs={12} class="grid-container">
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
        />
      </Grid>

      <Grid item xs={12} class="grid-container">
        <TextField
          label="Rating"
          variant="outlined"
          value={rating}
          onChange={onChangeRating}
        />
        </Grid>
        <Grid item xs={12} class="grid-container">
        <TextField

          label="Veg/Non-Veg"
          variant="outlined"
          value={veg}
          onChange={onChangeVeg}
        />
        </Grid>

         

        <Grid item xs={12} class="grid-container">
        <TextField
          label="Tags"
          variant="outlined"
          value={tags}
          onChange={onChangeTags}
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

export default EditFoodItem;