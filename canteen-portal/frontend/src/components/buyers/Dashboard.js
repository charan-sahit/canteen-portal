import React, { useEffect, useState } from "react";
import { Button } from 'reactstrap';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { Card, CardGroup, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from 'reactstrap';


const BuyerDashboard = () => {

    const [foodItems, setFoodItems] = useState([]);
    const [favBuyer, setFavBuyer] = useState({});
    const [flag, setFlag] = useState(false);
    const [favFood, setFavFood] = useState([]);
    const buyerId = localStorage.getItem('ID');
    const [checked, setChecked] = React.useState(false);
    const [quantity, setQuantity] = useState(1);
    const [status, setStatus] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const [value, setValue] = React.useState(0);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const onChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const onChangeValue = (event) => {
        setValue(event.target.value);
    };


    useEffect(() => {
        axios.get("http://localhost:4000/vendor/foodItems")
            .then(response => {
                console.log(response.data);
                setFoodItems(response.data);
            })
            .catch(err => {
                console.log(err);
            })

        

        axios.get("http://localhost:4000/buyer/getFavorites/" + buyerId)
            .then(response => {
                console.log(response.data);
                setFavFood(response.data);

            })
            .catch(err => {
                console.log(err);
            }
            )

        axios
            .post("http://localhost:4000/buyer/addMoney/" + buyerId, {
                balance: 0
            })
            .then(response => {
                console.log(response.data);
                setWalletBalance(response.data.balance);

            })
            .catch(err => {
                console.log(err);
            }
            )


    }, []);

    

    console.log(favFood);


    return (



        <div>
            <div>
                <h1>My Wallet</h1>
                <Grid >
                    <TextField
                        label="Wallet Balance"
                        variant="outlined"
                        value={walletBalance}

                    />
                </Grid>
                <Grid >
                    <TextField
                        label="Add Wallet Balance"
                        variant="outlined"
                        value={value}
                        onChange={onChangeValue}
                    />
                </Grid>
                <Button onClick={() => {
                    axios
                        .post("http://localhost:4000/buyer/addMoney/" + buyerId, {
                            balance: value
                        })
                        .then(response => {
                            console.log(response.data);
                            setWalletBalance(response.data.balance);
                        })
                        .catch(err => {
                            console.log(err);
                        }
                        )
                }}>Add Money</Button>


            </div>
            <h1>Favorites</h1>
            <Row xs={1} md={2} className="g-4">

                {favFood.map((user, ind) => (
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
                                <CardText>Shop Name: {user.shopName}</CardText>
                                
                                <Button

                                    onClick={() => {

                                        let quantity = prompt("Please Enter the quantity");
                                        axios
                                            .get("http://localhost:4000/vendor/foodItem/" + user.foodItemId)
                                            .then(response => {
                                                setFavBuyer(response.data)
                                                console.log(response.data)
                                                console.log(favBuyer)
                                                console.log(response.data[0].name)
                                                let bal = parseInt(response.data[0].price) * parseInt(quantity)
                                                if (walletBalance < bal) {
                                                    alert("Insufficient Balance")
                                                }
                                                else {
                                                    axios
                                                        .post("http://localhost:4000/buyer/addOrder/" + buyerId, {
                                                            buyerId: buyerId,
                                                            quantity: quantity,
                                                            name: response.data[0].name,
                                                            vendorId: response.data[0].vendorId,
                                                            price: response.data[0].price,
                                                            rating: response.data[0].rating,
                                                            veg: response.data[0].veg,
                                                            addOn: response.data[0].addOn,
                                                            tags: response.data[0].tags,
                                                            shopName: response.data[0].shopName,
                                                            foodItemId:user.foodItemId
                                                        })
                                                        .then(response => {
                                                            console.log(response)

                                                        })


                                                   


                                                    axios
                                                        .post("http://localhost:4000/buyer/deductMoney/" + buyerId, {
                                                            balance: bal
                                                        })
                                                        .then(response => {
                                                            console.log(response.data);
                                                            setWalletBalance(response.data.balance);
                                                        })
                                                        .catch(err => {
                                                            console.log(err);
                                                        }
                                                        )
                                                    

                                                }
                                            })
                                            .catch(err => {
                                                console.log(err)
                                            })








                                    }}>Order</Button>



                            </CardBody>
                        </Card>
                    </Col>
                ))}


            </Row>

            <h1>Food Items</h1>

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
                                <CardText>Shop Name: {user.shopName}</CardText>
                                <Button onClick={() => {
                                    console.log("hello")
                                    const email = localStorage.getItem('email')
                                    const password = localStorage.getItem('password')


                                    axios
                                        .get("http://localhost:4000/vendor/foodItem/" + user._id)
                                        .then(response => {
                                            setFavBuyer(response.data)
                                            console.log(response.data)
                                            console.log(favBuyer)
                                            console.log(response.data[0].name)
                                            axios
                                                .post("http://localhost:4000/buyer/addFavorite/" + buyerId, {

                                                    name: response.data[0].name,
                                                    vendorId: response.data[0].vendorId,
                                                    price: response.data[0].price,
                                                    rating: response.data[0].rating,
                                                    veg: response.data[0].veg,
                                                    addOn: response.data[0].addOn,
                                                    tags: response.data[0].tags,
                                                    shopName: response.data[0].shopName,
                                                    foodItemId: user._id
                                                })
                                                .then(response => {
                                                    console.log(response)
                                                    setStatus(response.data[0].status)
                                                })

                                        })
                                        .catch(err => {
                                            console.log(err)
                                        })


                                    window.location.reload();

                                }}>Add To Fav</Button>


                                <Button

                                    onClick={() => {

                                        let quantity = prompt("Please Enter the quantity");
                                        axios
                                            .get("http://localhost:4000/vendor/foodItem/" + user._id)
                                            .then(response => {
                                                setFavBuyer(response.data)
                                                console.log(response.data)
                                                console.log(favBuyer)
                                                console.log(response.data[0].name)
                                                let bal = parseInt(response.data[0].price) * parseInt(quantity)
                                                if (walletBalance < bal) {
                                                    alert("Insufficient Balance")
                                                }
                                                else {
                                                    axios
                                                        .post("http://localhost:4000/buyer/addOrder/" + buyerId, {
                                                            buyerId: buyerId,
                                                            quantity: quantity,
                                                            name: response.data[0].name,
                                                            vendorId: response.data[0].vendorId,
                                                            price: response.data[0].price,
                                                            rating: response.data[0].rating,
                                                            veg: response.data[0].veg,
                                                            addOn: response.data[0].addOn,
                                                            tags: response.data[0].tags,
                                                            shopName: response.data[0].shopName,
                                                            foodItemId: user._id
                                                        })
                                                        .then(response => {
                                                            console.log(response)

                                                        })


                                                  


                                                    axios
                                                        .post("http://localhost:4000/buyer/deductMoney/" + buyerId, {
                                                            balance: bal
                                                        })
                                                        .then(response => {
                                                            console.log(response.data);
                                                            setWalletBalance(response.data.balance);
                                                        })
                                                        .catch(err => {
                                                            console.log(err);
                                                        }
                                                        )
                                                    console.log(response.data[0].vendorId)
                                                    console.log(quantity)
                                                    axios
                                                    .put("http://localhost:4000/vendor/increasePlacedOrder/" + response.data[0].vendorId, {
                                                        quantity: quantity
                                                        })
                                                        .then(response => {
                                                            console.log(response.data);
                                                            
                                                        }
                                                        )
                                                        .catch(err => {
                                                            console.log(err);
                                                        }
                                                        )



                                                }
                                            })
                                            .catch(err => {
                                                console.log(err)
                                            })








                                    }}>Order</Button>


                            </CardBody>
                        </Card>
                    </Col>
                ))}


            </Row>

            
        </div>

    );
}

export default BuyerDashboard;




