const express = require("express");
const bodyParser = require('body-parser');
const movieNameSchema = require("../models/commentModel");
const mongoose = require("mongoose");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/save', (req, res, next) => {
    var movie = new movieNameSchema(req.body);
    console.log(movie);
    movieNameSchema.findOne({name:req.body.name}, (err,result) => {
        if(err) {
            res.status(500).json(err);
        } else if(result == null) {
            movie.save((err,result) => {
                console.log(result);
                if(err) {
                    console.log("data error");
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
                data: "Movie already exists"
            })
        }
    })
})

router.post('/load', (req, res, next) => {
    console.log("Inside load");
    movieNameSchema.find((err, result) => {
        console.log(result)
        res.status(200).json({
            status: "success",
            data: result
        })
    })
    console.log("data sent");
})

module.exports = router;