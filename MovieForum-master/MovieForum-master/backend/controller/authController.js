const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userSchema = require('../models/usersModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;


const router = express.Router();
mongoose.connect('mongodb://localhost/MoviesForum');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/signup', (req,res,next) => {
    
    var hash = bcrypt.hashSync(req.body.password,saltRounds);
    var userJson = {
        username: req.body.username,
        email: req.body.email,
        region: req.body.region,
        password: hash
    }

    var user = new userSchema(userJson);
    console.log(user);
    userSchema.findOne({username:req.body.username}, (err,result) => {
        if(err) {
            res.status(500).json(err);
        } else if(result == null) {
            user.save((err,result) => {
                console.log(result);
                if(err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json({
                        status: "success",
                        data: result
                    });
                }
            })
        } else {
            res.status(200).json({
                status: "fail",
                data: "Username already exists"
            })
        }
    })
})

router.post('/login', (req, res, next) => {
    

    userSchema.findOne({username: req.body.username}, (err,result) => {
        if(err){
            res.status(500).json(err);
        } else if(result == null){
            res.status(200).json({
                status: "fail",
                data: "invalid username"
            });
        } else {
            if(bcrypt.compareSync(req.body.password, result.password))
                res.status(200).json({
                    status: "success",
                    data: result
                });
            else
            res.status(200).json({
                status: "fail",
                data: "invalid password",
            });
        }
    })
})

router.get('/', (req,res,next) => {
    res.status(200).json("auth");
})

module.exports = router;