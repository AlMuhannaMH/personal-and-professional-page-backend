const express = require('express')


const User = require('../models/user.model')
const Resume = require('../models/resume.model')

const router = express.Router();

///// Add New Resume to User Account /////
router.post('/resume', (req, res) => {

    let user;
  // find a user based on the token 
  User.findOne({
            token: req.headers.token
        })
        .then(record => {
            if (!record) {
                throw new BadCredentialsError()
            }
            user = record
        });
    //create new resume
    Resume.create(req.body)
        .then((newResume) => {
            user.resume.push(newResume._id)
            user.save()
            res.status(201).json({
                "newResume": newResume
            });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});


///// Show all User Resumes /////
router.get('/resume', (req, res) => {
    // find a user based on the token 
    User.findOne({
            token: req.headers.token
        })
        .then(record => {
            if (!record) {
                res.status(401).json({
                    error: {
                        name: 'Unauthorized',
                        message: 'The provided cridintials are not valid for this operation'
                    }
                });
            } else {
                console.log(record.resume);
                

                Resume.find({_id:
                    {$in: record.resume}})
                    // Return all Resume as an Array
                    .then((resume) => {
                        console.log(resume);
                        
                        res.status(200).json({
                            resume: resume
                        });
                    })

            }
            user = record
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});



///// Show One of User Resumes /////
router.get('/resume/:id', (req, res) => {
    // find a user based on the token 
    User.findOne({
            $and: [{
                    token: req.headers.token
                },
                {
                    resume: req.params.id
                }
            ]
        })
        .then(record => {
            if (!record) {
                res.status(401).json({
                    error: {
                        name: 'Unauthorized',
                        message: 'The provided cridintials are not valid for this operation'
                    }
                });
            } else {
                Resume.findById(req.params.id)
                    .then((resume) => {
                        if (resume) {
                            res.status(200).json({
                                resume: resume
                            });

                        } else {
                            // If we couldn't find a document with the matching ID
                            res.status(404).json({
                                error: {
                                    name: 'DocumentNotFoundError',
                                    message: 'The provided ID doesn\'t match any documents'
                                }
                            });
                        }
                    })
            }
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        })
});



module.exports = router