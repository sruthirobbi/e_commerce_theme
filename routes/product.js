const router = require('express').Router();
let Product = require('../models/product.model');


router.route('/').get((req,res)=>{
    Product.find()
    .then(products =>res.json(products))
    .catch(err =>res.status(400).json('Error: '+ err))
});

router.post("/add",(req,res)=> {
    console.log(req.file);
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const desc = req.body.desc;
    const img = req.body.img;

    const newProduct = new Product({
        name,
        price,
        quantity,
        desc,
        img
    });

    newProduct.save()
    .then(product=> res.json(product))
    .catch(err => res.status(400).json({message: {msgBody:"Error has occured",msgError:true,err:err}}));

});


router.route('/:id').get((req,res)=>{
    Product.findById(req.params.id)
    .then(products =>res.json(products))
    .catch(err =>res.status(400).json({message: {msgBody:"Error has occured",msgError:true,err:err}}))
});

router.route('/:id').delete((req,res)=>{
    Product.findByIdAndDelete(req.params.id)
    .then(products =>res.json('Product Deleted'))
    .catch(err =>res.status(400).json({message: {msgBody:"Error has occured",msgError:true,err:err}}))
});


router.route('/update/:id').post((req,res)=>{
    Product.findById(req.params.id)
    .then(products =>{
        products.name = req.body.name,
        products.price = req.body.price,
        products.quantity = req.body.quantity,
        products.desc = req.body.desc;

        products.save()
        .then(()=>res.json('Product Updated!'))
        .catch(err=> res.status(400).json({message: {msgBody:"Error has occured",msgError:true,err:err}}))
    })
    .catch(err =>res.status(400).json({message: {msgBody:"Error has occured",msgError:true,err:err}}))
});


module.exports = router;