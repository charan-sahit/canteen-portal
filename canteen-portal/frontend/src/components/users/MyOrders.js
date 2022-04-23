import axios from "axios";
import React, { useEffect } from "react";
import { Button } from 'reactstrap';
import { Card, CardGroup, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from 'reactstrap';

const MyOrders = () => {
    const buyerId = localStorage.getItem("ID");
    const [orders, setOrders] = React.useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/buyer/orders/" + buyerId)
            .then(response => {
                console.log(response.data);
                setOrders(response.data);
            })
            .catch(err => {
                console.log(err);

            });

    }, []);
    return (
        <div>
            <h1>My Orders</h1>


            <Row xs={1} md={2} className="g-4">

                {orders.map((user, ind) => (
                    < div>
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
                                        Rating: {user.rating}
                                    </CardText>
                                    <CardText>
                                        Quantity: {user.quantity}
                                    </CardText>
                                    <CardText>
                                        Quantity: {user.vendorId}
                                    </CardText>

                                    <CardText>
                                        Status: {user.status}
                                    </CardText>
                                    <CardText>
                                        Status: {user.buyerId}
                                    </CardText>
                                    <CardText>Shop Name: {user.shopName}</CardText>
                                    <Button
                                        onClick={() => {


                                            axios
                                                .get("http://localhost:4000/vendor/getOrder/" + user._id)
                                                .then(response => {

                                                    console.log(response.data)

                                                    console.log(response.data[0].name)

                                                    let status = response.data[0].status
                                                    if (status === "READY FOR PICKUP") {
                                                        status = "COMPLETED"
                                                    }

                                                    axios
                                                        .put("http://localhost:4000/vendor/updateOrder/" + user._id, {
                                                            status: status
                                                        }
                                                        )
                                                        .then(response => {
                                                            console.log(response.data)
                                                            console.log(user)
                                                            axios
                                                                .put("http://localhost:4000/vendor/increaseOrder/" + user.foodItemId, {
                                                                    quantity: user.quantity
                                                                })
                                                                .then(responsee => {
                                                                    console.log(responsee)
                                                                }
                                                                )
                                                                .catch(err => {
                                                                    console.log(err)
                                                                }
                                                                )

                                                                axios
                                                        .put("http://localhost:4000/vendor/increaseCompletedOrder/" + user.vendorId, {
                                                            quantity: user.quantity
                                                            })
                                                            .then(response => {
                                                                console.log(response.data);
                                                                
                                                            }
                                                            )
                                                            .catch(err => {
                                                                console.log(err);
                                                            }
                                                            )                                                                 


                                                            window.location.reload();
                                                        }).catch(err => {
                                                            console.log(err);
                                                        }
                                                        );
                                                        


                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                })









                                        }}

                                        disabled={user.status === "READY FOR PICKUP" ? false : true}
                                        >Picked Up</Button>


                                </CardBody>
                            </Card>
                        </Col>
                    </div>
                ))}


            </Row>

        </div>



    );
};
export default MyOrders;
