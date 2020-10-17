const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const movieSchema = require('../models/movieModel');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/save', (req, res, next) => {
    var movie = new movieSchema(req.body);
    movieSchema.findOne({name: req.body.name}, (err,result) => {
        if(err){
            res.status(500).json(err);
        } else if(result == null) {
            movie.save((err, result) => {
                if(err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json({
                        status: "success",
                        data: result
                    })
                }
            })
        } else {
            res.status(200).json({
                status: "fail",
                data: "movie already exists"
            })
        }
    })

})

router.post('/load', (req, res, next) => {
    movieSchema.findOne({name: req.body.name}, (err,result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({
                status: "success",
                data: result
            })
        }
    })
})

router.post('/update',(req,res,next)=>{
    console.log("Inside Update",req.body)
    movieSchema.update({name:req.body.name},{$push: {comments: req.body.comments}},function (error, data) {
        if (error) {
            res.status(500).json(error)
        } else {
            res.status(200).json({
                status: "succes",
                result: data
            })
        }
    });
   //getmovie.update({nameofthemovie:req.body.nameofthemovie},{$push: {commentofthemovie: req.body.commentofthemovie}});
});


router.get('/', (req, res, next) => {
    res.status(200).json("movies")
})

module.exports = router;