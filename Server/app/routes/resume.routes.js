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
                res.status(401).json({
                    error: {
                        name: 'Unauthorized',
                        message: 'The provided cridintials are not valid for this operation'
                    } 
                })
            }
            else{
                user = record
                //create new resume
                Resume.create(req.body)
                .then((newResume) => {
                    user.resume.push(newResume._id)
                    user.save()
                    res.status(201).json({
                        "newResume": newResume
                    });
                })
            } 
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


                Resume.find({
                    _id:
                        { $in: record.resume }
                })
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



///// Show One of User's Resume /////
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



///// Delete a Resume From User Acaount /////
router.delete('/resume/:id', (req, res) => {
    let user;
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
            console.log(record);
            if (!record) {
                res.status(401).json({
                    error: {
                        name: 'Unauthorized',
                        message: 'The provided cridintials are not valid for this operation'
                    }
                });
            } else {
                user = record;
                Resume.findById(req.params.id)
                    .then((resume) => {
                        if (resume) {
                            // Pass the result of Mongoose's `.delete` method to the next `.then`
                            user.resume.splice(user.resume.indexOf((req.params.id, 0), 1))
                            user.save()
                            return resume.remove();
                        } else {
                            // If we couldn't find a document with the matching ID
                            res.status(404).json({
                                error: {
                                    name: 'DocumentNotFoundError',
                                    message: 'The provided ID Doesn\'t match any documents'
                                }
                            });
                        }
                    })
                    .then(() => {
                        // If the deletion succeeded, return 204 and no JSON
                        res.status(204).end();
                    })
            }
        })

        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});

router.patch('/resume/: id', (req, res) => {
    Resume.findById(req.params.id)
        .then(resume => {
            if (resume) {
                // Pass the result of Mongoose’s `.update` method to the next `.then`
                res.status(201).json({ resume });
                return user.update(req.body.resume);
            } else {
                // If we couldn’t find a document with the matching ID
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided ID Doesn’t match any documents'
                    }
                });
            }
        })
        .then(() => {
            // If the deletion succeeded, return 204 and no JSON
            res.status(204).end();
        })
        // Catch any errors that might occur
        .catch(error => {
            res.status(500).json({ error: error });
        });
});

module.exports = router