import axios from "axios";
import React, { useEffect } from "react";
import { Button } from 'reactstrap';
import { Card, CardGroup, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from 'reactstrap';

const MyVendorOrders = () => {
    const vendorId = localStorage.getItem("ID");
    const [orders, setOrders] = React.useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:4000/vendor/vendorOrders/" + vendorId)
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
                                    Status: {user.status}
                                </CardText>
                                
                                <CardText>Shop Name: {user.shopName}</CardText>
                                <Button
                                disabled={user.status === "COMPLETED" || user.status === "REJECTED" ? true : false}
                                    onClick={() => {

                                        let check = true
                                        axios
                                            .get("http://localhost:4000/vendor/getOrder/" + user._id)
                                            .then(response => {

                                                console.log(response.data)

                                                console.log(response.data[0].name)

                                                let status = response.data[0].status
                                                if (status === "PLACED") {
                                                    axios
                                                        .get("http://localhost:4000/vendor/" + vendorId)
                                                        .then(response => {
                                                            console.log(response.data);
                                                            if (response.data.pendingOrders > 10) {
                                                                check = true
                                                            }
                                                            else {
                                                                check = false
                                                            }
                                                        }
                                                        )

                                                }

                                                if (status === "PLACED" && check === false) {

                                                    status = "ACCEPTED"
                                                    axios
                                                        .put("http://localhost:4000/vendor/increasePendingOrder/" + user.vendorId, {
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
                                                }
                                                else if (status === "ACCEPTED") {
                                                    status = "COOKING"
                                                }
                                                else if (status === "COOKING") {
                                                    status = "READY FOR PICKUP"

                                                }
                                                if(check === false){
                                                axios
                                                    .put("http://localhost:4000/vendor/updateOrder/" + user._id, {
                                                        status: status
                                                    }
                                                    )
                                                    .then(response => {
                                                        console.log(response.data)

                                                        window.location.reload();
                                                    }).catch(err => {
                                                        console.log(err);
                                                    }
                                                    );
                                                }

                                            })
                                            .catch(err => {
                                                console.log(err)
                                            })








                                    }}
                                >
                                    Move to the next Stage
                                </Button>

                                <Button
                                    disabled={user.status === "COMPLETED" || user.status === "REJECTED" ? true : false}
                                    onClick={() => {

                                        let balance = 0
                                        axios
                                            .get("http://localhost:4000/vendor/getOrder/" + user._id)
                                            .then(response => {

                                                console.log(response.data)

                                                console.log(response.data[0].name)

                                                balance = parseInt(response.data[0].price) * parseInt(response.data[0].quantity)


                                                axios
                                                    .put("http://localhost:4000/vendor/decreasePendingOrder/" + user.vendorId, {
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

                                                axios
                                                    .put("http://localhost:4000/vendor/updateOrder/" + user._id, {
                                                        status: "REJECTED"
                                                    }
                                                    )
                                                    .then(response => {
                                                        console.log(response.data)

                                                        window.location.reload();
                                                    }).catch(err => {
                                                        console.log(err);
                                                    }
                                                    );

                                                axios
                                                    .post("http://localhost:4000/buyer/addMoney/" + user.buyerId, {
                                                        balance: balance
                                                    })
                                                    .then(response => {
                                                        console.log(response.data);


                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    }
                                                    )


                                            })
                                            .catch(err => {
                                                console.log(err)
                                            })










                                    }


                                    }
                                >Reject Order</Button>


                            </CardBody>
                        </Card>
                    </Col>
                ))}


            </Row>

        </div>



    );
};
export default MyVendorOrders;
