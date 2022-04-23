var express = require("express");
var router = express.Router();

const Vendor = require("../models/Vendors");
const FoodItem = require("../models/FoodItem");
const Favorite = require("../models/Favorites");

router.get("/", function(req, res) {
    Vendor.find(function(err, vendors) {
        if (err) {
        console.log(err);
        } else {
        res.json(vendors);
        }
    })
    });

//get a vendor by id
router.get("/:id", function(req, res) {
    Vendor.findById(req.params.id, function(err, vendor) {
        if (err) {
        console.log(err);
        } else {
        res.json(vendor);
        }
    })
    });
    

router.post("/register", (req, res) => {
    const newVendor = new Vendor({
        mname: req.body.mname,
        shopName: req.body.shopName,
        email: req.body.email,
        phone: req.body.phone,
        openingTime: req.body.openingTime,
        closingTime: req.body.closingTime,
        date: req.body.date,
        password: req.body.password,
    });

    newVendor.save()
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
    const password = req.body.password;
	// Find user by email
	Vendor.findOne({ email, password }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.json({
				status: "Vendor not found",
			});
        }
        else{
            //res.data.user = user;
            res.send({message: "Vendor Found", user: user});
            return user;
        }
	});
});

router.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    console.log(req.body);
    //for (const ops of req.body) {
    //    updateOps[ops.propName] = ops.value;
    //}
    Vendor.updateMany({ _id: id }, { $set: req.body })

        .exec()
        .then(result => {
            res.status(200).json({
                message: "Vendor updated",
                request: {
                    type: "GET",
                    url: "http://localhost:4000/vendor/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//add food item for a vendor
router.post("/addFoodItem/:id", (req, res) => {
    const id = req.params.id;
    const newFoodItem = new FoodItem({
        name: req.body.name,
        vendorId: id,
        price: req.body.price,
        rating: req.body.rating,
        veg: req.body.veg,
        addOn: req.body.addOn,
        tags: req.body.tags,
        shopName: req.body.shopName
    });

    newFoodItem.save()
        .then(foodItem  => {
            res.status(200).json(foodItem);
        })
        .catch(err => {
            res.status(400).send(err);
        });

})

//get food items of all vendors
router.get("/foodItems", (req, res) => {
    FoodItem.find(function(err, foodItems) {
        if (err) {
        console.log(err);
        } else {
        res.json(foodItems);
        }
    })
    });

//get food items of a vendor
router.get("/foodItems/:id", (req, res) => {
    const id = req.params.id;
    FoodItem.find({vendorId: id}, function(err, foodItems) {
        if (err) {
        console.log(err);
        } else {
        res.json(foodItems);
        }
    })
    });
   
    
//get a food item of a vendor
router.get("/foodItem/:id", (req, res) => {
    const vendor = req.params.vendor;
    const id = req.params.id;
    FoodItem.find({ _id: id}, function(err, foodItem) {
        if (err) {
        console.log(err);
        } else {
        res.json(foodItem);
        }
    })
    });
    

//edit food items of a vendor
router.put("/editFoodItem/:vendor/:id", (req, res) => {
    const vendor = req.params.vendor;
    const id = req.params.id;
    const updateOps = {};
    console.log(req.body);
    //for (const ops of req.body) {
    //    updateOps[ops.propName] = ops.value;
    //}
    FoodItem.updateMany({ _id: id }, { $set: req.body })

        .exec()
        .then(result => {
            res.status(200).json({
                message: "Food Item updated",
                request: {
                    type: "GET",
                    url: "http://localhost:4000/vendor/foodItems/" + vendor
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//delete a food item
/*router.delete("/deleteFoodItem/:id", (req, res) => {
    const id = req.params.id;
    FoodItem.deleteOne({ _id: id })

    .exec()
    .then(result => {
        res.status(200).json({
            message: "Food Item deleted",
            request: {
                type: "POST",
                url: "http://localhost:4000/vendor/addFoodItem/:id",
                body: {
                    name: "String",
                    vendorId: "String",
                    price: "Number",
                    rating: "Number",
                    veg: "Boolean",
                    addOn: "Array",
                    tags: "Array"
                }
            }
        });


    })
});*/

router.delete('/deleteFoodItem/:id', (req,res) => {
    FoodItem.findById(req.params.id).then(food => 
        food.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});

//add orders for a buyer
router.post("/addOrder/:id", (req, res) => {
    const id = req.params.id;
    const newOrder = new Order({
        buyerId: id,
        quantity: req.body.quantity,
        name: req.body.name,
        vendorId: req.body.vendorId,
        price: req.body.price,
        rating: req.body.rating,
        veg: req.body.veg,
        addOn: req.body.addOn,
        tags: req.body.tags,
        shopName: req.body.shopName
    });

    newOrder.save()

        .then(order  => {
            res.status(200).json(order);
        })

        .catch(err => {
            res.status(400).send(err);
        });

});

//get an order
router.get("/getOrder/:id", (req, res) => {
    const id = req.params.id;
    Order.find({ _id: id}, function(err, order) {
        if (err) {

        } else {
        res.json(order);

        }
    })
    });
    


//view all orders of a buyer
router.get("/orders/:id", (req, res) => {
    const id = req.params.id;
    Order.find({buyerId: id}, function(err, orders) {
        if (err) {
        console.log(err);
        } else {
        res.json(orders);
        }
    })
    });

    
//find orders of a vendor
router.get("/vendorOrders/:id", (req, res) => {
    const id = req.params.id;

    Order.find({vendorId: id}, function(err, orders) {
        if (err) {
        console.log(err);
        } else {
        res.json(orders);
        }
    })
    });


//update the status of an order
router.put("/updateOrder/:id", (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    console.log(req.body);
    //for (const ops of req.body) {
    //    updateOps[ops.propName] = ops.value;
    //}
    Order.updateMany({ _id: id }, { $set: req.body })


        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order updated",
                request: {

                    type: "GET",
                    url: "http://localhost:4000/buyer/orders/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({
                error: err
            });
        });
});

//increase the number of orders of a food item by a given amount
router.put("/increaseOrder/:id", (req, res) => {
    const id = req.params.id;
    FoodItem.findById(id, function(err, foodItem) {
        if (err) {
        console.log(err);
        } else {
        foodItem.numberOfOrders += parseInt(req.body.quantity);
        foodItem.save();
        res.json(foodItem);
        }
    })
    });

//increase placed orders of a vendor by a given amount
router.put("/increasePlacedOrder/:id", (req, res) => {
    const id = req.params.id;


    Vendor.findById(id, function(err, vendor) {
        if (err) {
        console.log(err);
        } else {
        vendor.placedOrders += parseInt(req.body.quantity);
        vendor.save();
        res.json(vendor);
        }
    })
    });


//increase pending orders of a vendor by a given amount
router.put("/increasePendingOrder/:id", (req, res) => {
    const id = req.params.id;

    Vendor.findById(id, function(err, vendor) {
        if (err) {
        console.log(err);
        } else {
        vendor.pendingOrders += parseInt(req.body.quantity);
        vendor.save();
        res.json(vendor);
        }
    })
    });

//decrease pending orders of a vendor by a given amount
router.put("/decreasePendingOrder/:id", (req, res) => {
    const id = req.params.id;

    Vendor.findById(id, function(err, vendor) {

        if (err) {
        console.log(err);
        } else {
        vendor.pendingOrders -= parseInt(req.body.quantity);
        vendor.save();
        res.json(vendor);
        }
    })
    });

    
//increase the number of completed orders
router.put("/increaseCompletedOrder/:id", (req, res) => {
    const id = req.params.id;

    Vendor.findById(id, function(err, vendor) {
        if (err) {
        console.log(err);
        } else {
        vendor.completedOrders += parseInt(req.body.quantity);
        vendor.save();
        res.json(vendor);
        }
    })

    });
    
    

module.exports = router;