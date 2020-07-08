const router = require('express').Router();
let User = require('../models/users.model');
let Product = require('../models/product.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const passport = require('passport')
const passportConfig = require('../passport');

// router.get('/',(req,res)=>{
//     User.find()
//     .then(users =>res.json(users))
//     .catch(err =>res.status(400).json('Error: '+ err))
// });

// router.post('/',auth, (req,res)=>{
//     const {email,password} = req.body;
//     if(!email || !password) {
//          return res.status(400).send('Please enter all fields');
//     }
//     User.findOne({ email })
//     .then(user =>{
//         if(!user) return res.status(400).send('User Does not exists');

//         bcrypt.compare(password,user.password)
//         .then(isMatch => {
//             if(!isMatch) return res.status(400).send('InValid Credentials');
//             jwt.sign(
//                 {id:user.id},
//                 config.get('jwtSecret'),
//                 {expiresIn:3600},
//                 (err,token)=>{
//                     if(err) throw err;
//                     res.json({
//                         token,
//                         id:user.id,
//                         email:user.email
//                     })
//                 }
//             )

//         })
//     })
// });

// router.route('/add').post((req,res)=> {

//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;
//     const isAdmin = req.body.isAdmin;

//     User.findOne({ email: req.body.email }, function(err, user) {
 
//         //if a user was found, that means the user's email matches the entered email
//         if (user) {
//             return res.status(401).send('The email address ' + req.body.email + ' is already exists');
//         } 
//         else if(password.length<6){
//             return res.status(401).send('The password length should be minimum 6 character');
//         }
//         else  {
            
//             const newUser = new User({
//                 username,
//                 email,
//                 password,
//                 isAdmin
//             });

//             bcrypt.genSalt(10, (err,salt) => 
//                 bcrypt.hash(newUser.password, salt, (err,hash)=>{
//                     if(err){
//                         throw err;
//                     }
//                     //set Password to Hash
//                     newUser.password = hash;
//                     newUser.save()
//                     .then((user)=>

//                         jwt.sign(
//                             { id:user.id},
//                             config.get('jwtSecret'),
//                             {expiresIn:3600},
//                             (err,token)=>{
//                                 if(err) throw err;
//                                 res.json({
//                                     token,
//                                     id:newUser.id
//                                 }),
//                                 res.status(400).send(` Register Succesfully`)
//                             }
//                         )
                        
//                        )
//                     .catch(err => res.status(400).json('Error: '+ err));
//             }))
            
//         }
//      }); 
        
  

// });

// router.get('/user',auth,(req,res) => {
//     User.findById(req.user.id)
//     .select('-password')
//     .then(user=>res.json(user))
// })

const signToken = userID =>{
    return jwt.sign({
        iss:"jwtTokenScreate",
        sub:userID
    },"jwtTokenScreate",{expiresIn:"1h"});
}

router.post('/register',(req,res)=>{
    const {username,password,role} = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message:{msgBody:"Error has occured", msgError:true}})
        if(user)
            res.status(400).json({message:{msgBody:"Username already taken", msgError:true}})
        else{
            const newUser = new User({password,username,role});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message:{msgBody:"Error has occured", msgError:true,err:err}})
                else    
                    res.status(201).json({message:{msgBody:"Account Successfully created", msgError:false}})

            })
        }

    })
});

router.post('/login',passport.authenticate('local',{session:false}), (req,res)=>{
    if(req.isAuthenticated()){
        const {_id,username,role} = req.user;
        const token = signToken(_id);
        res.cookie('access_token',token,{httpOnly:true,sameSite:true})
        res.status(200).json({isAuthenticated: true,user:{username,role}})
    }
});

router.get('/logout',passport.authenticate('jwt',{session:false}), (req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username:"",role:""},success:true});
});

router.get('/admin',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.role==='admin'){
        res.status(200).json({message:{msgBody:"You are an admin", msgError:false}})
    }else{
        res.status(403).json({message:{msgBody:"You are not an admin",msgError:true}})
    }
});

router.get('/authenticated',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated:true, user:{username,role}});
});

module.exports = router;