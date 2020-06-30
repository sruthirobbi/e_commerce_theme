const router = require('express').Router();
let AddItem = require('../models/addItem.model');
let Product = require('../models/product.model');


router.route('/').get((req,res)=>{
    AddItem.find()
    .then(users =>res.json(users))
    .catch(err =>res.status(400).json('Error: '+ err))
});

router.route('/add').post((req,res)=> {
    const name = req.body.name;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);
    const desc = req.body.desc;

    const newProduct = new Product({
        name,
        price,
        quantity,
        desc
    });

    newProduct.save()
    .then(()=>res.json('Product added!'))
    .catch(err => res.status(400).json('Error: '+ err));

});

module.exports = router;