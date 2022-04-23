import axios from "axios";
import React, {useState, useEffect} from "react";
import { Button } from 'reactstrap';
import { Card, CardGroup, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Row, Col} from 'reactstrap';

const Statistics = () => {
    
    const vendorId = localStorage.getItem("ID");
    const [foodItems, setFoodItems] = useState([]);
    const [placedOrders, setPlacedOrders] = useState("");
    const [pendingOrders, setPendingOrders] = useState("");
    const [completedOrders, setCompletedOrders] = useState("");
    useEffect(() => {

    axios
    .get("http://localhost:4000/vendor/foodItems/"+ vendorId)
    .then(response => {
        console.log(response.data);
        setFoodItems(response.data);
    })
    .catch(err => { 
        console.log(err);
    })

    axios
    .get("http://localhost:4000/vendor/"+ vendorId)
    .then(response => {
        console.log(response.data);
        setPlacedOrders(response.data.placedOrders);
        setPendingOrders(response.data.pendingOrders);
        setCompletedOrders(response.data.completedOrders);
    }
    )

    .catch(err => {
        console.log(err);
    }
    )


}, []);

    //sort foodItems by numberOfOrders
    const sortedFoodItems = foodItems.sort((a, b) => {
        return b.numberOfOrders - a.numberOfOrders;
    });

    //keep only top 5 of sortedFoodItems
    const top5FoodItems = sortedFoodItems.slice(0, 5);

    return (
        <div>
        <h1>Statistics</h1>
        <h2>Top 5 Items</h2>
        <Row xs={1} md={2} className="g-4">
          
          {top5FoodItems.map((user, ind) => (
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
                        .get("http://localhost:4000/vendor/getOrder/"+user._id)
                        .then(response => {
                            
                            console.log(response.data)
                            
                            console.log(response.data[0].name)
                            
                            let status = response.data[0].status
                            if (status === "PLACED") {
                                status = "ACCEPTED"
                            }
                            else if (status === "ACCEPTED") {
                                status = "COOKING"
                            }
                              else if (status === "COOKING") {
                                  status = "READY FOR PICKUP"

                                 }
                                 else if (status === "READY FOR PICKUP") {
                                     status = "COMPLETED"
                                 }

                            axios
                            .put("http://localhost:4000/vendor/updateOrder/"+user._id, {
                                   status: status
                        }
                         )
                         .then(response => {
                             console.log(response.data)
                             
                             window.location.reload();
                         })  .catch(err => {
                             console.log(err);
                         }
                         );

                            
                        })
                        .catch(err => {
                            console.log(err)
                        })
 
 
 
 
 
 
 
                        
                 }}
                      
                      disabled={user.status === "READY FOR PICKUP" ? false : true}>Picked Up</Button>

                      
                  </CardBody>
                  </Card>
                  </Col>
               
                ))}


</Row>
            <h2>
                Total Orders Placed: {placedOrders}<br/>
                Total Orders Pending: {pendingOrders}<br/>
                Total Orders Completed: {completedOrders}<br/>

            </h2>
        </div>
    );
}

    export default Statistics;