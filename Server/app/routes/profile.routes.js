const express = require('express')


const User = require('../models/user.model')
const Profile = require('../models/profile.model')

const router = express.Router();

///// Add New Profile to User Account /////
router.post('/profile', (req, res) => {

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
    //create new profile
    Profile.create(req.body)
        .then((newProfile) => {
            user.profile.push(newProfile._id)
            user.save()
            res.status(201).json({
                "newProfile": newProfile
            });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
});


///// Show all User Profiles /////
router.get('/profile', (req, res) => {
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
                console.log(record.profile);


                Profile.find({
                    _id:
                        { $in: record.profile }
                })
                    // Return all Profile as an Array
                    .then((profile) => {
                        console.log(profile);

                        res.status(200).json({
                            profile: profile
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



///// Show One of User Profiles /////
router.get('/profile/username', (req, res) => {
    // find a user based on the token 
    User.findOne({
        $and: [{
            token: req.headers.token
        },
        {
            profile: req.params.username
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
                Profile.findById(req.params.id)
                    .then((profile) => {
                        if (profile) {
                            res.status(200).json({
                                profile: profile
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



///// Delete a Profile From User Acaount /////
router.delete('/profile/:id', (req, res) => {
    let user;
    // find a user based on the token 
    User.findOne({
        $and: [{
            token: req.headers.token
        },
        {
            profile: req.params.id
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
                Profile.findById(req.params.id)
                    .then((profile) => {
                        if (profile) {
                            // Pass the result of Mongoose's `.delete` method to the next `.then`
                            user.profile.splice(user.profile.indexOf((req.params.id, 0), 1))
                            user.save()
                            return profile.remove();
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

router.patch('/profile/: id', (req, res) => {
    Profile.findById(req.params.id)
        .then(profile => {
            if (profile) {
                // Pass the result of Mongoose’s `.update` method to the next `.then`
                res.status(201).json({ profile });
                return user.update(req.body.profile);
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