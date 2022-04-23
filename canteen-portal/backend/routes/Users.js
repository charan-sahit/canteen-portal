var express = require("express");
var router = express.Router();

// Load User model
const Buyer = require("../models/Users");
const Favorite = require("../models/Favorites");
const Order = require("../models/Orders");
const Wallet = require("../models/Wallet");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Buyer.find(function(err, buyers) {
		if (err) {
			console.log(err);
		} else {
			res.json(buyers);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newBuyer = new Buyer({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        age:req.body.age,
        batch:req.body.batch,
        date:req.body.date
    });

    newBuyer.save()
        .then(buyer => {
            res.status(200).json(buyer);
        }
        )
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
    const password = req.body.password;

    const errorBuyer = new Buyer({
        email:"not found",
    })
	// Find user by email
	Buyer.findOne({ email, password }).then(user => {
		// Check if user email exists
		if (!user) {
			/*return res.status(404).json({
				error: "Buyer not found",
			});*/
            return res.json({
				status: "Buyer not found",
			});
        }
        else{
            
            
            res.send({message:"Buyer Found",user:user,status:"success"});
            
            return user;
        }
	});
});

//update buyer
router.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    console.log(req.body);
    //for (const ops of req.body) {
    //    updateOps[ops.propName] = ops.value;
    //}
    Buyer.updateMany({ _id: id }, { $set: req.body })

        .exec()
        .then(result => {
            res.status(200).json({
                message: "Buyer updated",
                request: {
                    type: "GET",
                    url: "http://localhost:4000/buyer/" + id
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

//add favorites for a buyer
router.post("/addFavorite/:id", (req, res) => {
    const id = req.params.id;
    const newFavorite = new Favorite({
        buyerId:id,
        name: req.body.name,
        vendorId: req.body.vendorId,
        price: req.body.price,
        rating: req.body.rating,
        veg: req.body.veg,
        addOn: req.body.addOn,
        tags: req.body.tags,
        shopName: req.body.shopName,
        foodItemId: req.body.foodItemId
    });

    newFavorite.save()
        .then(foodItem  => {
            res.status(200).json(foodItem);
        })
        .catch(err => {
            res.status(400).send(err);
        });

})

//get all the favorites
router.get("/getFavorites/:id", (req, res) => { 
    const id = req.params.id;
    Favorite.find({buyerId:id}).then(favorites => {
        res.status(200).json(favorites);
    })
    .catch(err => {
        res.status(400).send(err);
    });
})


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
        shopName: req.body.shopName,
        foodItemId: req.body.foodItemId
    });

    newOrder.save()

        .then(order  => {
            res.status(200).json(order);
        })

        .catch(err => {
            res.status(400).send(err);
        });

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


//add money to wallet for a user
router.post("/addMoney/:id", (req, res) => {
    const id = req.params.id;
    Wallet.findOne({buyerId: id}, function(err, wallet) {
        if (err) {
        console.log(err);
        } else {
            console.log(wallet);
            if(wallet){
                console.log(wallet.balance);
                wallet.balance = wallet.balance + parseInt(req.body.balance);
                wallet.save();
                res.json(wallet);
            }
            else{
                const newWallet = new Wallet({
                    buyerId: id,
                    balance: req.body.balance
                });
                console.log(newWallet);
                newWallet.save()
                    .then(wallet  => {
                        res.status(200).json(wallet);
                    })
                    .catch(err => {
                        res.status(401).send(err);
                    });
            }
        }
    })
    });

//deduct money from wallet for a user
router.post("/deductMoney/:id", (req, res) => {
    const id = req.params.id;
    Wallet.findOne({buyerId: id}, function(err, wallet) {
        if (err) {
        console.log(err);
        } else {
            console.log(wallet);
            if(wallet){
                console.log(wallet.balance);
                wallet.balance = wallet.balance - parseInt(req.body.balance);
                console.log(parseInt(req.body.balance));
                wallet.save();
                res.json(wallet);
            }
        }
    })
    });


    

//add orders to a buyer

module.exports = router;

