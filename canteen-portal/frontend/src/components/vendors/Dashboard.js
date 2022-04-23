import React, {useState, useEffect} from "react";
import { Button } from 'reactstrap';
import { Card, CardGroup, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Row, Col} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Navigate, useNavigate } from "react-router-dom";
import TagsInput from "../templates/Tags";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const VendorDashboard = () => {
    console.log("VendorDashboard");
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const vendorID = localStorage.getItem('ID');

    console.log(email);
    console.log(password);


    //const [ID, setID] = useState("");
    //get vendor details
    const [foodItems, setFoodItems] = useState([]);
    useEffect(() => {
    
    
        /*axios
        .post('http://localhost:4000/vendor/login', {
            email: email,
            password: password
        })
        .then(response => {
            setID(response.data.user._id);
        })
        .catch(err => {
            console.log(err);
        })*/
        //show all the food items of the vendor
        axios
        .get('http://localhost:4000/vendor/foodItems/' + vendorID)
        .then(response => {
            setFoodItems(response.data);
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    
    }, [])

    const addFoodItem = () => {
      navigate("/vendor/addFoodItem");
    }

    const editItem = (ID) => {
      localStorage.setItem("editID", ID);
      navigate("/vendor/editFoodItem/");
    }

    const deleteItem = (ID) => {
      axios
        .delete('http://localhost:4000/vendor/deleteFoodItem/' + ID)
        .then(response => {
          console.log(response);
          alert("Item deleted successfully");
        })
        .catch(err => {
          console.log(err);
        });
      window.location.reload();
    }

    console.log(foodItems);
    
    return (
        
        
        
        <div>
        
            <Button onClick={addFoodItem}>Add New Food Item</Button>
            <Row xs={1} md={2} className="g-4">
            
            {foodItems.map((user, ind) => (
                  <Col>
                  <Card>
                    <CardBody>
                        <CardTitle tag="h5">
                            {user.name}
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Price:{user.price}
                        </CardSubtitle>
                        <CardText>
                            Rating {user.rating}
                        </CardText>
                        <Button onClick={() => editItem(user._id)}>Edit</Button>
                        <Button onClick={() => deleteItem(user._id)}>Delete</Button>
                        

                    </CardBody>
                    </Card>
                    </Col>
                  ))}
  

</Row>
</div>
       
    );
}

export default VendorDashboard;




