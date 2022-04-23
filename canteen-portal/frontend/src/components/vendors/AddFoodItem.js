import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const AddFoodItem = () => {

    const [name, setName] = useState("");
    
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [veg, setVeg] = useState(true);
    const [tags, setTags] = useState([]);
    const [shopName, setShopName] = useState("");

    const shop = localStorage.getItem("shopName");
    console.log(shop);

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

    const onChangeShopName = (event) => {

        setShopName(event.target.value);
    }

    const onChangeTags = (event) => {
        //convert the string to array both comma and space separated
        const tagsArray = event.target.value.split(",").map(tag => tag.trim());
        setTags(tagsArray);
        
        
        
    }


    const onSubmit = (event) => {
        event.preventDefault();


        //get ID from local storage
        const ID = localStorage.getItem("ID");
        console.log(ID);
        const foodItem = {
            name: name,
            
            price: price,
            
            veg : veg,
            vendorId: ID,
            tags: tags,
            shopName: shop
            
            
        };

        

        //make a post request to backend
        axios
        .post("http://localhost:4000/vendor/addFoodItem/"+ID, foodItem)
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

export default AddFoodItem;